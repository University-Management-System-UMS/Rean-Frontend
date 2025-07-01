export const ROUTES = {
  // Authentication
    AUTH: {
        LOGIN: '/(public)/(auth)/login',
        FORGOT_PASSWORD: '/(public)/(auth)/forgot-password',
        PIN_CODE: '/(public)/(auth)/pin-code',
    },
    // public routes
    PUBLIC_ROUTES: {
        ONBOARDING: '/(public)/onboarding',
        SELECT_INSTITUTE: '/(public)/select-institute',
    },
  // Main App (tabs)
    TABS: {
        HOME: '/(app)/(tabs)/home',
        PROFILE: '/(app)/(tabs)/profile',
    },
    //notification
    NOTIFICATION: {
        LIST: '/(app)/notification',
        DETAIL: '/(app)/notification/detail/:id',
    },
    DASHBOARD: {
        QR_SCAN: '/(app)/qr-scanner',
        UI_TESTING: '/(app)/ui-testing',
    },
    // leave
    LEAVE: {
        LEAVE: '/(app)/leave-review',
        LEAVE_DETAIL: '/(app)/leave-review',
        APPLY_LEAVE: '/(app)/leave/apply-leave', 
    }
} as const;

export default ROUTES;