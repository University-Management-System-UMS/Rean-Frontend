import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useInstitute } from "@/hooks/useInstitute";
import React, { useState } from "react";
import { Color } from "@repo/colors";
import AuthHeader from "@/components/app-headers/auth-header";
import AuthHeaderTitle from "@/components/auth/auth-header-title";
import { useTranslation } from "@/hooks/useTranslation";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { CustomButton, CustomTextInput, FontSize, FontWeight, Spacing, Text } from "@repo/ums-agent";
import { NavigationUtil } from "@/utils/navigation.util";

export default function SelectInstitute() {
  const [institute, setInstitute] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
  const [instituteError, setInstituteError] = useState("");
  const [loading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { searchInstitute, isLoading, data: instituteResults } = useInstitute();

  const handleSearchChange = (text: string) => {
    setInstitute(text);
    setSelectedInstitute(null);
    setInstituteError("");
    if (text.length >= 3) {
      searchInstitute(text);
    }
  };

  const handleSelectInstitute = (selected: string) => {
    setSelectedInstitute(selected);
    setInstitute(selected); 
  };

  const handleContinue = async () => {
    if(loading) return;
    try {
      setIsLoading(true);
      NavigationUtil.navigateToLogin();
    } catch (error) {
      console.error("Error selecting institute:", error);
      setInstituteError(t("instituteScreen").somethingWentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light"/>
        <View style={styles.wrapper}>
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
            <View style={styles.mainContainer}>
              <View style={styles.headerSection}>
                <AuthHeader showBackButton={false}/>
              </View>

              <View style={styles.bodySection}>
                <AuthHeaderTitle
                  title= {t("instituteScreen").title}
                  description= {t("instituteScreen").descript}
                />

                <View style={styles.formSection}>
                  {selectedInstitute ? (
                    <View style={styles.selectedWrapper}>
                      <Text style={styles.selectedLabel}>
                        {t("instituteScreen").selectInstitute}
                      </Text>
                      <View style={styles.selectedBox}>
                        <Ionicons
                            name="search"
                            size={20}
                            color={Color.grayScale.grayOne}
                          />
                        <Text style={styles.selectedText} 
                              numberOfLines={1} 
                              ellipsizeMode="tail">
                                {selectedInstitute}</Text>
                        <TouchableOpacity onPress={() => {
                          setSelectedInstitute(null);
                          setInstitute("");
                        }}>
                          <Ionicons
                            name="close-circle"
                            size={20}
                            color={Color.grayScale.grayTwo}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <>
                      <CustomTextInput
                        label= {t("instituteScreen").selectInstitute}
                        placeholder= {t("instituteScreen").searchInstitute}
                        value={institute}
                        onChangeText={!loading ? handleSearchChange : undefined}
                        error={instituteError}
                        icon={<Ionicons name="search" size={20} color={Color.grayScale.grayOne} />}
                        rightIcon={
                          institute.length > 0 && (
                            <TouchableOpacity onPress={() => handleSearchChange("")}>
                              <Ionicons
                                name="close-circle"
                                size={20}
                                color={Color.grayScale.grayTwo}
                              />
                            </TouchableOpacity>
                          )
                        }
                      />

                      {isLoading && (
                        <View style={styles.loading}>
                          <ActivityIndicator/>
                        </View>
                      )}

                      {institute.length >=3 && instituteResults.length > 0 && (
                        <ScrollView
                          style={styles.dropdownContainer}
                          showsVerticalScrollIndicator={false}
                          bounces={false}
                        >
                          {instituteResults.map((item) => (
                            <TouchableOpacity
                              key={item.InId}
                              style={styles.dropdownItem}
                              onPress={() => {
                                handleSelectInstitute(item.insNm || "");
                              }}
                            >
                              <View style={styles.itemRow}>
                                {item.insLgo ? (
                                  <Image source={{ uri: item.insLgo }} style={styles.itemImage} />
                                ) : (
                                  <Ionicons name="school" size={32} color={Color.primary} />
                                )}
                                <Text style={styles.itemText}>{item.insNm}</Text>
                              </View>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      )}
                    </>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.continueButton}>
            <CustomButton
              title={t("instituteScreen").continue}
              onPress={handleContinue}
              textStyle={styles.continueText}
              disabled={!selectedInstitute || loading}
            />
          </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Color.background
  },
  mainContainer: {
    flex: 1,
  },
  headerSection: {
    flex: 0,
  },
  bodySection: {
    paddingTop: Spacing.xl,
    padding: Spacing.md,
  },
  formSection: {
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  dropdownContainer: {
    maxHeight: 9 * 41,
    borderColor: Color.background,
    borderRadius: Spacing.base,
    shadowColor: Color.grayScale.grayTwo,
    shadowOpacity: 0.2,
  },
  dropdownItem: {
    marginBottom: 1,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
    padding: Spacing.base,
    flex: 1,
  },
  itemImage: {
    width: 32,
    height: 32,
    borderRadius: Spacing.lg,
    backgroundColor: Color.grayScale.grayThree,
  },
  itemText: {
    marginLeft: Spacing.base,
    fontSize: FontSize.base,
    flex: 1,
    flexWrap: "wrap",
  },
  selectedWrapper: {
    gap: Spacing.xs,
  },
  selectedLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Color.grayScale.black,
  },
  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.sm,
    minHeight: 44,
    borderWidth: 1,
    borderColor: Color.grayScale.grayTwo,
    backgroundColor: Color.white,
    borderRadius: Spacing.base,
  },
  selectedText: {
    fontSize: FontSize.base,
    color: Color.grayScale.black,
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  continueButton: {
    bottom: Spacing.lg,
    padding: Spacing.base,
  },
  continueText: {
    fontSize: FontSize.base,
  },
  loading: {
    paddingVertical: Spacing.base, 
    alignItems: "center" 
  },
});
