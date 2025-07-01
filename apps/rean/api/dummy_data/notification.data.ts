import { Notification } from "@/api/types/notification";

export const initialNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Message',
      body: 'You have received a new message from John',
      timestamp: '20250510041255',
      isRead: false,
      category: ''
    },
    {
      id: '2',
      title: 'System Update',
      body: 'A new version of the app is available',
      timestamp: '20250509235959',
      isRead: false,
      category: ''
    },
    {
      id: '3',
      title: 'Reminder',
      body: 'Don\'t forget your meeting at 2pm today',
      timestamp: '20250510140000',
      isRead: false,
      category: ''
    },
    {
      id: '4',
      title: 'Payment Received',
      body: 'Your payment of $29.99 has been processed...',
      timestamp: '20250508153000',
      isRead: false,
      category: ''
    },
    {
      id: '5',
      title: 'New Follower',
      body: 'Sarah started following you',
      timestamp: '20250507120000',
      isRead: false,
      category: ''
    },
    {
      id: '6',
      title: 'Assignment Due',
      body: 'Your Mathematics assignment is due tomorrow at 11:59 PM',
      timestamp: '20250506093000',
      isRead: false,
      category: ''
    },
    {
      id: '7',
      title: 'Exam Schedule',
      body: 'Final examination schedule for semester 2 has been released',
      timestamp: '20250505143000',
      isRead: true,
      category: ''
    },
    {
      id: '8',
      title: 'Library Notice',
      body: 'The book "Data Structures and Algorithms" is due for return in 2 days',
      timestamp: '20250504110000',
      isRead: false,
      category: ''
    },
    {
      id: '9',
      title: 'Campus Event',
      body: 'Join us for the Annual Tech Fair this weekend at the main auditorium',
      timestamp: '20250503163000',
      isRead: true,
      category: 'faculty'
    },
    {
      id: '10',
      title: 'Course Registration',
      body: 'Course registration for the next semester will begin on May 15th',
      timestamp: '20250502083000',
      isRead: false,
      category: 'faculty'
    }
  ];