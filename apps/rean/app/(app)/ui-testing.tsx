/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, SafeAreaView, Button } from 'react-native';
import { BottomSheet, CustomButton, Text } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { ToggleLanguage } from '@/components/toggle-language';
import { useTranslation } from '@/hooks/useTranslation';
import { StatusBar } from 'expo-status-bar';
import { httpClient } from "@/api/http-client";
import { AuthService } from '@/api/services/auth.service';
import { APIPath } from '@/api/api.constant';
import { useCustomAlert } from '@/contexts/custom-alert.context';
import { DateUtils } from '@/utils/date.util';
import { useLanguage } from '@/contexts/language.context';
import { CourseContentGroup } from '@/components/my-learning/my-learning-course-detail/content-group';
import { ContentData } from '@/api/dummy_data/course-content.data';
import { contentResponse } from '@/api/types/course-detail';
import TabComponent from '@/components/ums-tabs';
import { courseResponse } from '@/api/types/my-learning-course/course';
import { CourseData } from '@/api/dummy_data/course.data';
import { router } from 'expo-router';
import CourseList from '@/components/my-learning/my-learning-course-list/course-listing';
import SearchLeaveModal from '@/components/review-leave/apply-leave/search-leave';
import { LeaveStatusType } from '@/components/review-leave/apply-leave/leave-detail';

export default function DevelopComponentTesting() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const { t } = useTranslation();
  const TestToggleLanguage = () => {
    return (
      <View style={styles.modalContainer}>
        <Text>{t('rean')}</Text>
        <ToggleLanguage />
      </View>
    );
  };



  const SearchLeave = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);
    return (<View style={{}}>
      <Button title="Search Leave" onPress={handleOpenModal} />

      <SearchLeaveModal
        visible={modalVisible}
        buttonText="Apply"
        onClose={handleCloseModal}
      />
    </View>)
  };

  const TestChatting = () => {
    const handleOpenChatting = () => {
      setSelectedTest(null);
      router.push('/my-learning/message-list/message');
    };
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Chatting Component</Text>
        {/* Add your chatting component here */}
        <CustomButton
          title="Go to Chatting"
          onPress={handleOpenChatting}
        />
      </View>
    );
  }

  const TestRequestingAPI = () => {
    const [text, setText] = useState('');
    const handleGetInstituteInfo = async () => {
      try {
        const response = await httpClient.post('/institute/getinstituteInfoDtls', {
          InId: "666a5ba99af4438a191a8f6e"
        });
        setText(JSON.stringify(response.data));
      } catch (error) {
        setText(JSON.stringify(error));
      }
    };

    const handleLogout = async () => {
      try {
        const response = await AuthService.logout();
        setText(JSON.stringify(response));
      } catch (error) {
        setText(JSON.stringify(error));
      }
    };

    const handleLogin = async () => {
      try {
        const response = await httpClient.post(APIPath.LOGIN, {
          Email: "Chay-Seavleng@gmail.com",
          pwd: "mptc@1234",
          dtype: "A",
          v: "2",
          isMobile: true
        });

        // Log response headers to check for cookies
        setText(JSON.stringify(response.headers));
      } catch (error) {
        setText(JSON.stringify(error));
      } finally { /* empty */ }
    };
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <CustomButton
          title="Login"
          onPress={handleLogin}
        />
        <CustomButton
          title="Get Institute Info"
          onPress={handleGetInstituteInfo}
          variant="outline"
        />
        <CustomButton
          title="Logout"
          onPress={handleLogout}
        />
        <Text>{text}</Text>
      </View>
    );
  };

  const TestPopUp = () => {
    const { alert } = useCustomAlert();
    // Close the test modal before showing any alerts
    const showAlertWrapper = (alertFunction: () => void) => {
      setSelectedTest(null);
      setTimeout(() => {
        alertFunction();
      }, 300); // Wait for modal to close
    };

    const showSimpleAlert = () => {
      alert('Simple Alert', 'This is a simple alert with default OK button');
    };

    const showAlertWithImage = () => {
      alert(
        'Image Alert',
        'This alert includes an image in the header, includes an image in the header, includes an image in the header',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        {
          imageSource: require('@/assets/images/apply-leave/submit.png'),
          imageStyle: { width: 100, height: 100 },
        }
      );
    };

    const showConfirmAlert = () => {
      alert(
        'Confirm Action',
        'Are you sure you want to proceed with this action?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ]
      );
    };

    const showMultipleButtonsAlert = () => {
      alert(
        'Choose an Option',
        'Please select one of the following options:',
        [
          {
            text: 'Option 1',
            onPress: () => console.log('Option 1 selected'),
          },
          {
            text: 'Option 2',
            onPress: () => console.log('Option 2 selected'),
          },
          {
            text: 'Option 3',
            onPress: () => console.log('Option 3 selected'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    };

    const showDestructiveAlert = () => {
      alert(
        'Warning',
        'This action cannot be undone. Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => console.log('Delete confirmed'),
          },
        ]
      );
    };

    return (
      <View style={styles.container}>
        <CustomButton
          title="Show Simple Alert"
          onPress={() => showAlertWrapper(showSimpleAlert)}
        />
        <View style={styles.spacer} />
        <CustomButton
          title="Show Alert with Image"
          onPress={() => showAlertWrapper(showAlertWithImage)}
        />
        <View style={styles.spacer} />
        <CustomButton title="Show Confirm Alert" onPress={() => showAlertWrapper(showConfirmAlert)} />
        <View style={styles.spacer} />
        <CustomButton title="Show Multiple Options" onPress={() => showAlertWrapper(showMultipleButtonsAlert)} />
        <View style={styles.spacer} />
        <CustomButton title="Show Destructive Alert" onPress={() => showAlertWrapper(showDestructiveAlert)} />
      </View>
    );
  };

  const TestLeaveDetail = () => {
    const [activeStatus, setActiveStatus] = React.useState<LeaveStatusType>(LeaveStatusType.REJECTED);

    enum LeaveCategoryType {
      STUDY = 'Study Leave',
      MEDICAL = 'Medical Leave',
      PERSONAL = 'Personal Leave',
      ANNUAL = 'Annual Leave',
      EMERGENCY = 'Emergency Leave',
    }

    const { language } = useLanguage()

    // Sample leave details
    const leaveDetails = {
      category: LeaveCategoryType.STUDY,
      reason: 'Urgent task with team project',
      startDate: language === 'kh'
        ? DateUtils.format.toKhmerDate(new Date('2025-05-22T05:04:55'))
        : DateUtils.format.toDate(new Date('2025-05-22T05:04:55')),
      endDate: language === 'kh'
        ? DateUtils.format.toKhmerDate(new Date('2025-05-23T05:04:55'))
        : DateUtils.format.toDate(new Date('2025-05-23T05:04:55')),
      duration: '1 Day',
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* <LeaveStatusScreen
            status={activeStatus}
            leaveDetails={leaveDetails}
          /> */}

          <View style={styles.buttonContainer}>
            <Button
              title="Show Rejection Status"
              onPress={() => setActiveStatus(LeaveStatusType.REJECTED)}
            />
            <View style={styles.spacer} />

            <Button
              title="Show Approval Status"
              onPress={() => setActiveStatus(LeaveStatusType.APPROVED)}
            />
            <View style={styles.spacer} />

            <Button
              title="Show Submitted Status"
              onPress={() => setActiveStatus(LeaveStatusType.SUBMITTED)}
            />
            <View style={styles.spacer} />

            <Button
              title="Show Cancelled Status"
              onPress={() => setActiveStatus(LeaveStatusType.CANCELLED)}
            />
            <View style={styles.spacer} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const TestBottomSheet = () => {
    const [visible, setVisible] = useState(false);
    const handleOpenModal = () => setVisible(true);
    const handleCloseModal = () => setVisible(false);

    return (
      <View>
        <CustomButton
          title="Open Bottom Sheet"
          onPress={handleOpenModal}
        />
        <BottomSheet
          visible={visible}
          onClose={handleCloseModal}
          maxHeight={400}
        >
          <ScrollView>
            <View style={{ flexDirection: 'column', gap: 8, }}>
              <CustomButton title='1' onPress={() => { }} />
              <CustomButton title='2' onPress={() => { }} />
              <CustomButton title='3' onPress={() => { }} />
              <CustomButton title='4' onPress={() => { }} />
              <CustomButton title='5' onPress={() => { }} />
              <CustomButton title='6' onPress={() => { }} />
              <CustomButton title='7' onPress={() => { }} />
              <CustomButton title='8' onPress={() => { }} />
              <CustomButton title='5' onPress={() => { }} />
              <CustomButton title='6' onPress={() => { }} />
              <CustomButton title='7' onPress={() => { }} />
              <CustomButton title='8' onPress={() => { }} />
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    )
  }

  const TestCourseDetail = () => {
    const contentData = ContentData as contentResponse[];
    const [contents] = useState(contentData);

    const contentTabContent = useMemo(() => {
      return [
        {
          label: 'All',
          content: (
            <CourseContentGroup
              contentData={contents} />
          )
        },
        {
          label: 'Assignment',
          content: (
            <CourseContentGroup
              contentData={contents.filter(c => c.cntType === 'assignment')} />
          )
        },
        {
          label: 'Quiz',
          content: (
            <CourseContentGroup
              contentData={contents.filter(c => c.cntType === 'quiz')} />
          )
        },
        {
          label: 'Grade',
          content: (
            <CourseContentGroup
              contentData={contents.filter(c => c.cntType === 'graded')} />
          )
        }
      ];
    }, [contents]);
    return (
      <View style={styles.container}>
        <TabComponent tabs={contentTabContent} />
      </View>
    );
  }
  
  const TestCourseList = () => {
    const courseData = CourseData as courseResponse[];
    const handlePressLeaveItem = (course: courseResponse) => {
      router.push(`/(app)/leave-review/${course._id}`);
    };

    return (
      <View 
        // style={styles.container}
      >
        <CourseList data={courseData} onPressItem={handlePressLeaveItem} />
      </View>
    );
  }
  
  const testComponents = [
    { name: 'Test Switch Language', component: <TestToggleLanguage /> },
    { name: 'Test Reqesting API', component: <TestRequestingAPI /> },
    { name: 'Test Pop UP', component: <TestPopUp /> },
    { name: 'Test Leave status', component: <TestLeaveDetail /> },
    { name: 'Test Search Leave', component: <SearchLeave /> },
    { name: 'Test Bottom Sheet', component: <TestBottomSheet /> },
    { name: 'Test Chatting', component: <TestChatting /> },
    { name: 'Test Course List', component: <TestCourseList /> },
    { name: 'Test Course Detail', component: <TestCourseDetail /> },
  ];

  const handleTestPress = (testName: string) => {
    setSelectedTest(testName);
  };

  const renderTestComponent = () => {
    const test = testComponents.find(t => t.name === selectedTest);
    return test ? test.component : null;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {testComponents.map((test, index) => (
          <CustomButton
            key={index}
            title={test.name}
            onPress={() => handleTestPress(test.name)}
            containerStyle={styles.button}
          />
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedTest}
        animationType="fade"
        onRequestClose={() => setSelectedTest(null)}
      >
        <StatusBar style='dark' backgroundColor={Color.accent}/>
        <SafeAreaView style={{ flex: 1}}>
          <View style={styles.modalContainer}>
            {renderTestComponent()}
            <CustomButton
              title="Close"
              onPress={() => setSelectedTest(null)}
              containerStyle={styles.closeButton}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Color.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
  },
  spacer: {
    height: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  buttonContainer: {
    padding: 20,
    marginTop: 40,
  },
});