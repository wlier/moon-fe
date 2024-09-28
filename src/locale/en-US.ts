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
      'en-US': '中文',
      'zh-CN': 'English',
    },
    mode: {
      dark: 'Dark Mode',
      light: 'Light Mode',
      system: 'Follow System',
    },
  },
  Layout: {
    footer: {
      copyright: '© 2023 Moon monitor.',
      rights: 'All rights reserved.',
      version: 'version',
      privacyPolicy: 'Privacy Policy',
      termsService: 'Terms of Service',
    },
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
    team: {
      create: 'Create Team',
      cancel: 'Cancel',
      confirm: 'Confirm',
      form: {
        name: {
          error: {
            required: 'Team name cannot be empty',
            max: 'Team name cannot exceed 20 characters',
          },
          label: 'Name',
          placeholder: 'Please enter the team name',
        },
        logo: {
          error: {
            required: 'Team logo cannot be empty',
            max: 'Team logo cannot exceed 255 characters',
          },
          label: 'Logo',
          placeholder: 'Please enter the team logo',
        },
        remark: {
          error: {
            required: 'Team description cannot be empty',
            max: 'Team description cannot exceed 255 characters',
          },
          label: 'Description',
          placeholder: 'Please enter the team description',
        },
      },
    },
    strategy: {
      group: {
        edit: {
          create: 'Create Strategy Group',
          edit: 'Edit Strategy Group',
          delete: 'Delete Strategy Group',
          cancel: 'Cancel',
          confirm: 'Confirm',
          form: {
            name: {
              error: {
                required: 'Strategy group name cannot be empty',
                max: 'Strategy group name cannot exceed 20 characters',
              },
              label: 'Name',
              placeholder: 'Please enter the strategy group name',
            },
            remark: {
              error: {
                required: 'Strategy group description cannot be empty',
                max: 'Strategy group description cannot exceed 255 characters',
              },
              label: 'Description',
              placeholder: 'Please enter the strategy group description',
            },
            categoriesIds: {
              error: {
                required: 'Strategy group classification cannot be empty',
              },
              label: 'Classification',
              placeholder: 'Please select the strategy group classification',
            },
          },
        },
      },
      list: {
        edit: {
          create: 'Create Strategy',
          edit: 'Edit Strategy',
          delete: 'Delete Strategy',
          cancel: 'Cancel',
          confirm: 'Confirm',
          form: {
            name: {
              error: {
                required: 'Strategy name cannot be empty',
                max: 'Strategy name cannot exceed 20 characters',
              },
              label: 'Strategy name',
              placeholder: 'Please enter the strategy name',
            },
            groupId: {
              error: {
                required: 'Strategy group cannot be empty',
              },
              label: 'Strategy Group',
              placeholder: 'Please select the strategy group',
            },
            sourceType: {
              error: {
                required: 'Datasource type cannot be empty',
              },
              label: 'Datasource type',
              placeholder: 'Please select the datasource type',
            },
            remark: {
              error: {
                required: 'Remark cannot be empty',
                max: 'Remark cannot exceed 255 characters',
              },
              label: 'Remark',
              placeholder: 'Please enter the remark',
            },
            categoriesIds: {
              error: {
                required: 'Strategy classification cannot be empty',
              },
              label: 'Classification',
              placeholder: 'Please select the strategy classification',
            },
            datasourceIds: {
              error: {
                required: 'Datasource cannot be empty',
              },
              label: 'Datasource',
              placeholder: 'Please select the datasource',
            },
            step: {
              error: {
                required: 'Query step cannot be empty',
                min: 'Query step must be greater than or equal to 1 seconds',
                max: 'Query step must be less than or equal to 100 seconds',
              },
              label: 'Step(s)',
              placeholder: 'Please enter the query step',
            },
            expr: {
              error: {
                required: 'Query expression cannot be empty',
              },
              label: 'Expr',
              placeholder: 'Please enter the query expression',
            },
            alarmGroupIds: {
              error: {
                required: 'alarm notice group cannot be empty',
              },
              label: 'Alarm Notice Group',
              placeholder: 'Please select the alarm notice group',
            },
            labels: {
              error: {},
              label: 'Labels',
              placeholder: 'Please enter the labels',
              add: 'Add label',
              addRemark: 'Click to add',
            },
            annotations: {
              error: {},
              label: 'Annotations',
              placeholder: 'Please enter the annotations',
              add: 'Add annotation',
              addRemark: 'Click to add',
              summary: {
                label: 'Summery',
                placeholder: 'Please enter the summary',
                error: {
                  required: 'Summary cannot be empty',
                },
              },
              description: {
                label: 'Description',
                placeholder: 'Please enter the description',
                error: {
                  required: 'Description cannot be empty',
                },
              },
            },
            strategyLevel: {
              add: 'Add Strategy Level',
              error: {
                required: 'Strategy level cannot be empty',
              },
              label: 'Strategy Level',
              levelId: {
                error: {
                  required: 'Strategy level cannot be empty',
                },
                label: 'Level',
                placeholder: 'Please select the strategy level',
              },
              condition: {
                error: {
                  required: 'Condition cannot be empty',
                },
                label: 'Condition',
                placeholder: 'Please select the condition',
              },
              threshold: {
                error: {
                  required: 'Threshold cannot be empty',
                },
                label: 'Threshold',
                placeholder: 'Please enter the threshold',
              },
              sustainType: {
                error: {
                  required: 'Sustain type cannot be empty',
                },
                label: 'Sustain type',
                placeholder: 'Please select the sustain type',
              },
              duration: {
                error: {
                  required: 'Duration cannot be empty',
                },
                label: 'Duration(s)',
                placeholder: 'Please enter the duration',
              },
              count: {
                error: {
                  required: 'Count cannot be empty',
                },
                label: 'Count',
                placeholder: 'Please enter the count',
              },
              alarmGroupIds: {
                error: {
                  required: 'Alarm notice group cannot be empty',
                },
                label: 'Notice Group',
                placeholder: 'Please select the alarm notice group',
              },
              labelNotices: {
                error: {},
                label: 'Label Notices',
                placeholder: 'Please enter the label notices',
                add: 'Add label notice',
                addRemark: 'Click to add',
              },
            },
          },
        },
      },
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
