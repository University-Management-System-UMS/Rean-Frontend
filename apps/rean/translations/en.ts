export const en = {
  calendar: "Calendar",
  rean: "Rean System",
  ok: "OK",
  cancel: "Cancel",
  yes: "Yes",
  no: "No",
  to: "To",
  tryAgain: "Try again",
  filter: "Filter",
  empty: "Empty",
  continue: "Continue",
  confirm: "Confirm",
  day: 'Day',
  days: 'Days',
  noMessage: {
    title: "Whoops!",
    body: "No data were found. Please try again later!",
  },
  //login page
  loginPage: {
    welcome: "Welcome to UMS Mobile",
    descript:
      "The university system is a network of higher education institutions offering a range of undergraduate, graduate.",
    email: "Email",
    password: "Password",
    pwPlaceholder: "Enter Password",
    error: {
      title: "Login Failed",
      unauthorized: "Unauthorized",
      please_login_again: "Please login again",
      emailValidate: "*Please enter a valid email address",
      emailRequrired: "*Email is required",
      pwValidate: "*Password must be at least 6 characters",
      pwRequired: "Password is required",
    },

    dontRememberPw: "Don't remember password?",
    reset: "Reset here",
    login: "Login",
  },

  //forgot password page
  forgotPasswordPage: {
    forgotPassword: "Forgot Password",
    enterEmail: "Enter your email to reset password",
    sendReset: "Send reset link",
    loading: "Sending...",
    resetSent: "Reset password link has been sent to your email",
    emailPlaceholder: "example@gmail.com",
    sendError: "Failed to send reset code",
  },
  //onBoarding
  onBoardingScreen: {
    title1: "Inspire, Learn, Achieve",
    title2: "Innovate, Educate, Transform",
    title3: "Discover Your Potential",
    descript:
      "Captures our university's mission to spark student motivation, deepen their knowledge through rigorous learning, and empower them to achieve their personal and professional goals.",
    skip: "Skip",
    next: "Next",
    done: "Done",
    start: "Start",
  },

  //Institute screen
  instituteScreen: {
    title: "Select Institute",
    descript:
      "Select Institute equips students with quality education and practical skills for future success.",
    selectInstitute: "Select Institute",
    searchInstitute: "Search your institute",
    continue: "Continue",
    somethingWentWrong: "Something went wrong. Please try again.",
  },
  homeMenu: {
    home: "Home",
    viewAttendance: "View Attendance",
    myLearning: "My Learning",
    attendanceSummary: "Attendance Summary",
    leaveReview: "Leave Review",
    enquiry: "Enquiry",
    scanAttendance: "Scan Attendance",
    logout: "Logout",
  },

  //Review Leave Feature
  leaveReviewScreen: {
    leaveReview: "Review Leave",
    leaveDetail: "Leave Details",
    applyLeaveHeader: "Apply Leave",
    leaveStatus: "Leave status",
    dateOption: "Date (Optional)",
    headerContent:
      "Apply for leave by choosing the date, reason, and leave type. Submit your request for university approval",

    applyLeave: "Apply Leave",
    descript: "Are you sure you want to apply for leave?",
    cancel: "Cancel",
    fullDay: "Full Day",
    halfDay: "Half Day",
    am: "AM",
    pm: "PM",
  },
  leaveStatus: {
    rejected: {
      title: "Reject apply leave",
      message:
        "Sorry, your lecturer doesn't approve your leave. Please try to apply again.",
    },
    approved: {
      title: "Leave approved",
      message: "Your leave application has been approved. Enjoy your time off.",
    },
    submitted: {
      title: "Leave submitted",
      message:
        "Your leave application has been submitted and is waiting for approval.",
    },
    cancelled: {
      title: "Leave cancelled",
      message: "Your leave application has been cancelled as requested.",
    },
    pending: {
      title: "Leave pending",
      message:
        "Your leave application is pending review. You'll be notified once it's processed.",
    },
    tabs: {
      all: "All",
      rejected: "Rejected",
      pending: "Pending",
      approved: "Approved",
      cancelled: "Cancelled",
      submitted: "Submitted",
      unknown: "Unknown",
    },
  },
  leave: {
    totalLeave: "Total leave",
    search: "Search",
    confirmButton: "Confirm",
    applyLeave: {
      title: "Apply leave",
      type: "Leave Type",
      typePlaceholder: "Select leave type",
      message: "Please fill in the form below to apply for leave.",
      leaveType: "Leave type",
      leaveReason: "Leave reason",
      leaveSubmit: "Leave Submitted",
      leaveSubmitMessage:
        "Your study leave request has been successfully submitted. Please waiting for approval",
      leaveFailed: "Apply Leave failed",
      leaveFailedMessage:
        "Your request couldn’t be submitted. Please try again.",
      selectToUploadFile: "Select here to upload file",
      supportFiles: "Supported files",
      selectDate: "Select date",
      startDate: "Start date",
      endDate: "End date",
      leaveOption: "Leave options",
      partialDate: "Partial date",
      session: "Session",
      leaveReasonLabel: "Leave for reason",
      leaveReasonPlaceholder: "Please enter your leave reason",
      selectPeriod: "Select period",
      selectPeriodPlaceholder: "Select period",
      viewDetails: "View Details",
      cancelLeave: "Cancel Leave",
      halfDay: "Half Day",
      periodWise: "Period Wise",
      error: {
        partialDateRequired: "Partial date is required",
        partialDateOutOfRange: "Partial date is out of range",
        startDateRequired: "Start date is required",
        endDateRequired: "End date is required",
        sessionRequired: "Session is required",
        selectPeriodRequired: "Select period is required",
        leaveReasonRequired: "Leave reason is required",
        leaveTypeRequired: "Leave type is required",
        leaveAlreadyApplied: "Leave already applied for the given date",
      },
    },
    empty: {
      title: "Empty Leaves",
      message:
        "You have no leave request yet. We'll let you know when there's something new!!",
    },
  },

  myLearning: {
    title: "My Learning",
    desc: "View your enrolled courses, track progress, and continue learning with organized access to lessons and updates.",
    chatting: {
      chatInput: "Type your message here",
    },
    menu: {
      all: "All",
      assignment: "Assignment",
      quiz: "Quiz",
      grade: "Grade",
    },
  },
  messageCompose: {
    newMessage: "New Message",
    subject: "Subject",
    subjectPlaceholder: "Fill the subject",
    message: "Message",
    messagePlaceholder: "Type message here",
    submit: "Submit",
    titlePopUp: "Submit fail",
    descriptPopUp: "You can't send the message. Please try again.",
    tryAgain: "Try Again",
  },
  message: {
    title: "Messages",
    desc: "View your enrolled courses, track progress, and continue learning with organized access to lessons and updates.",
    empty: {
      title: "No Message",
      message:
        "You have no message yet. We'll let you know when there's something new!!",
    },
  },
  quiz: {
    yourSubmission: "Your Submission",
    takeTest: "Take Test",
    confirmAlert: {
      submit: "Submit Test?",
      descript: "Are you sure you want to submit quiz?",
      cancel: "Cancel",
      ok: "OK",
    },
    warningAlert: {
      end: "End Test?",
      descript:
        "Are you sure you want to end the quiz? Your progress won't be save and you will have to start the quiz over again",
    },
    button: {
      previous: "Previous",
      next: "Next",
      submit: "Submit",
      review: "Review Quiz",
      start: "Start",
    },
    attempts: {
      multiple: "Multiple Attempts",
      open: "Open Date",
      close: "Close Date",
      total: "Total Time Completion",
    },
    card: {
      timeLimit: "Time Limit",
      question: "Questions",
    },
    quizResult: 'Quiz Result'
  },

  assignment: {
    addSubmission: "Add Submission",
    freeText: "Free text",
    uploadFile: "Upload File",
    urlText: "URL",
    urlInput: "Enter URL",
    pointCriterial: "Point Criterial",
    assignmentHeader: "Assignment",
    submitButton: "Submit",
    error: "Something went wrong!",
    removeText: "Remove",
    editText: "Edit",
    editHeader: "Edit Assignment",
    needUrl: "URL is required",
    wrongUrl: "Invalid URL format",
    alert: {
      title: "Submit Assignment",
      removeTitle: "Remove Assignment",
      lateTitle: "Late Submission",
      lateDescription: "Are you sure you want to submit this assignment? You are late!",
      removeDescription: "Are you sure you want to remove this assignment?",
      description: "Are you sure you want to submit this assignment?",
      cancelButton: "Cancel",
      OkButton: "OK"
    },
    completedAlert: {
      title: "Completed",
      description: "Your assignment has been submitted successfully.",
      doneButton: "Done",
    },
    pointTable: {
      textName: "Name",
      textRate: "Ratings",
      textPoint: "Points",
      textTotalPoint: "Total Points"
    },
  },

  error: {
    title: "An error occurred",
    unauthorized: "Unauthorized. Please login again.",
    notFound: "Data not found.",
    serverError: "Server error. Please try again later.",
    unexpectedError: "Unexpected error occurred.",
    invalidRequest: "Invalid request.",
    noResponse: "No response from server. Check your network.",
    somethingWentWrong: "Something went wrong. Please try again.",
  }

} as const;
