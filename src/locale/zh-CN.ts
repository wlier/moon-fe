const zhCNI18n = {
  APP: 'Moon 监控系统',
  Login: {
    welcome: {
      title: '欢迎来到我们的应用程序',
      subtitle: '登录以访问所有功能。',
    },
    form: {
      title: '登录您的账户',
      username: '用户名',
      password: '密码',
      captcha: '验证码',
      login: '登录',
      forgetPassword: '忘记密码？',
      register: '注册',
      registerFooter: '已有账户？',
      loginFooter: '没有账户？',
      registerLink: '去注册',
      loginLink: '去登录',
      rememberMe: '记住账号密码',
      captchaPlaceholder: '请输入验证码',
      usernamePlaceholder: '请输入用户名',
      passwordPlaceholder: '请输入密码',
      error: {
        usernameMin: '用户名不能为空',
        usernameMax: '用户名不能超过20个字符',
        passwordMin: '密码不能为空',
        passwordMax: '密码长度不能超过20个字符',
        captchamMin: '验证码不能为空',
        captchaMax: '验证码长度不能超过10个字符',
      },
    },
    locale: {
      'en-US': '中文',
      'zh-CN': 'English',
    },
    mode: {
      dark: '深色模式',
      light: '浅色模式',
      system: '跟随系统',
    },
  },
  Layout: {
    footer: {
      copyright: '© 2023 Moon 监控系统。',
      rights: '保留所有权利。',
      version: '版本',
      privacyPolicy: '隐私策略',
      termsService: '服务条款',
    },
    menu: {
      monitor: '实时监控',
      monitorDashboard: '数据大盘',
      monitorAlarm: '实时告警',
      datasource: '数据源',
      datasourceMetric: '指标',
      datasourceLog: '日志',
      datasourceTrace: '链路',
      strategy: '策略管理',
      strategyGroup: '策略组',
      strategyList: '策略列表',
    },
    my: {
      title: '我的账号',
      profile: '个人资料',
      logout: '退出登录',
      settings: '设置',
      team: '团队',
      newTeam: '新建团队',
      inviteUsers: {
        title: '邀请用户',
        email: '邮箱',
        phone: '手机号',
      },
      KeyboardShortcuts: '快捷键',
    },
    team: {
      create: '创建团队',
      cancel: '取消',
      confirm: '确定',
      form: {
        name: {
          error: {
            required: '团队名称不能为空',
            max: '团队名称不能超过20个字符',
          },
          label: '团队名称',
          placeholder: '请输入团队名称',
        },
        logo: {
          error: {
            required: '团队logo不能为空',
            max: '团队logo不能超过255个字符',
          },
          label: '团队logo',
          placeholder: '请输入团队logo',
        },
        remark: {
          error: {
            required: '团队描述不能为空',
            max: '团队描述不能超过255个字符',
          },
          label: '团队描述',
          placeholder: '请输入团队描述',
        },
      },
    },
    strategy: {
      group: {
        edit: {
          create: '创建策略组',
          edit: '编辑策略组',
          delete: '删除策略组',
          cancel: '取消',
          confirm: '确定',
          form: {
            name: {
              error: {
                required: '策略组名称不能为空',
                max: '策略组名称不能超过20个字符',
              },
              label: '策略组名称',
              placeholder: '请输入策略组名称',
            },
            remark: {
              error: {
                required: '策略组描述不能为空',
                max: '策略组描述不能超过255个字符',
              },
              label: '策略组描述',
              placeholder: '请输入策略组描述',
            },
            categoriesIds: {
              error: {
                required: '策略组分类不能为空',
              },
              label: '策略组分类',
              placeholder: '请选择策略组分类',
            },
          },
        },
      },
      list: {
        edit: {
          create: '创建策略',
          edit: '编辑策略',
          delete: '删除策略',
          cancel: '取消',
          confirm: '确定',
          form: {
            name: {
              error: {
                required: '策略名称不能为空',
                max: '策略名称不能超过20个字符',
              },
              label: '策略名称',
              placeholder: '请输入策略名称',
            },
            groupId: {
              error: {
                required: '策略组不能为空',
              },
              label: '策略组',
              placeholder: '请选择策略组',
            },
            sourceType: {
              error: {
                required: '数据源类型不能为空',
              },
              label: '数据源类型',
              placeholder: '请选择数据源类型',
            },
            remark: {
              error: {
                required: '策略描述不能为空',
                max: '策略描述不能超过255个字符',
              },
              label: '策略描述',
              placeholder: '请输入策略描述',
            },
            categoriesIds: {
              error: {
                required: '策略分类不能为空',
              },
              label: '策略分类',
              placeholder: '请选择策略分类',
            },
            datasourceIds: {
              error: {
                required: '数据源不能为空',
              },
              label: '数据源',
              placeholder: '请选择数据源',
            },
            step: {
              error: {
                required: '采样率不能为空',
                min: '查询采样率不能小于1s',
                max: '采样率不能大于100s',
              },
              label: '采样率(秒)',
              placeholder: '请输入采样率',
            },
            expr: {
              error: {
                required: '告警表达式不能为空',
              },
              label: '告警表达式',
              placeholder: '请输入告警表达式',
            },
            alarmGroupIds: {
              error: {
                required: '通知对象不能为空',
              },
              label: '通知对象',
              placeholder: '请选择通知对象',
            },
            labels: {
              error: {},
              label: '标签',
              placeholder: '请输入标签',
              add: '添加标签',
              addRemark: '在这里输入键值对',
            },
            annotations: {
              error: {},
              label: '注解',
              placeholder: '请输入注解',
              add: '添加注解',
              addRemark: '在这里输入键值对',
              summary: {
                label: '告警摘要',
                placeholder: '请输入告警摘要',
                error: {
                  required: '告警摘要不能为空',
                },
              },
              description: {
                label: '告警描述',
                placeholder: '请输入告警描述',
                error: {
                  required: '告警描述不能为空',
                },
              },
            },
            strategyLevel: {
              add: '添加策略等级',
              error: {
                required: '策略等级明细不能为空',
              },
              label: '策略等级明细',
              levelId: {
                error: {
                  required: '告警等级不能为空',
                },
                label: '告警等级',
                placeholder: '请选择告警等级',
              },
              condition: {
                error: {
                  required: '判断条件不能为空',
                },
                label: '判断条件',
                placeholder: '请选择判断条件',
              },
              threshold: {
                error: {
                  required: '阈值不能为空',
                },
                label: '阈值',
                placeholder: '请输入阈值',
              },
              sustainType: {
                error: {
                  required: '触发类型不能为空',
                },
                label: '触发类型',
                placeholder: '请选择触发类型',
              },
              duration: {
                error: {
                  required: '持续时长不能为空',
                },
                label: '持续时长(秒)',
                placeholder: '请输入持续时长（秒）',
              },
              count: {
                error: {
                  required: '告警次数不能为空',
                },
                label: '告警次数',
                placeholder: '请输入告警次数',
              },
              alarmGroupIds: {
                error: {
                  required: '通知对象不能为空',
                },
                label: '通知对象',
                placeholder: '请选择通知对象',
              },
              labelNotices: {
                error: {},
                label: '标签通知对象',
                placeholder: '请输入标签通知',
                add: '添加标签通知对象',
                addRemark: '在这里输入键值对',
              },
            },
          },
        },
      },
    },
  },
  AutoTable: {
    operation: '操作',
  },
  HookModal: {
    cancel: '取消',
    confirm: '确定',
  },
}

export default zhCNI18n
