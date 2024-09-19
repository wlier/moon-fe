import { I18nLocaleType } from '.'

const enUSI18n: I18nLocaleType = {
  APP: 'Moon Monitor',
  Login: {
    welcome: {
      title: 'Welcome to our App',
      subtitle: 'Sign in to access all the features.',
    },
    form: {
      title: 'Sign in to your account',
      username: 'Username',
      password: 'Password',
      captcha: 'Captcha',
      login: 'Login',
      forgetPassword: 'Forgot your password?',
      register: 'Register',
      registerFooter: 'Have an account?',
      loginFooter: "Don't have an account? ",
      registerLink: 'to register',
      loginLink: 'to login',
      rememberMe: 'Remember me',
      captchaPlaceholder: 'Please enter the captcha',
      usernamePlaceholder: 'Please enter the username',
      passwordPlaceholder: 'Please enter the password',
      error: {
        usernameMin: 'The username cannot be empty',
        usernameMax: 'The username cannot exceed 20 characters',
        passwordMin: 'The password cannot be empty',
        passwordMax: 'The password length cannot exceed 20 characters',
        captchamMin: 'Captcha cannot be empty',
        captchaMax: 'Captcha length cannot exceed 10 characters',
      },
    },
    locale: {
      'en-US': 'English',
      'zh-CN': 'Chinese',
    },
    mode: {
      dark: 'Dark Mode',
      light: 'Light Mode',
      system: 'Follow System',
    },
  },
  Layout: {
    menu: {
      monitor: 'Monitor',
      monitorDashboard: 'Dashboard',
      monitorAlarm: 'Alarm',
      datasource: 'Datasource',
      datasourceMetric: 'Metric',
      datasourceLog: 'Log',
      datasourceTrace: 'Trace',
      strategy: 'Strategy',
      strategyGroup: 'Group',
      strategyList: 'List',
    },
    my: {
      title: 'My Account',
      profile: 'Profile',
      logout: 'Logout',
      settings: 'Settings',
      team: 'Team',
      newTeam: 'New Team',
      inviteUsers: {
        title: 'Invite Users',
        email: 'Email',
        phone: 'Phone',
      },
      KeyboardShortcuts: 'Keyboard shortcuts',
    },
  },
  AutoTable: {
    operation: 'Operation',
  },
  HookModal: {
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
}

export default enUSI18n
