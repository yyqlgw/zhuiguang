# 追光者 · 科技青年志

> 课程思政实践作业 · Android 单机应用
>
> 以 12 位中国科技工作者为人物卡牌，把「读人物、学知识、答题目、勤打卡」做成一条轻量的日常学习路径。

---

## 一、项目定位

「追光者 · 科技青年志」是一款面向青年学生的**科技人物学习与自我管理 App**。它不做资讯聚合，也不依赖网络，而是把公开报道中的科技工作者事迹、名言与科技常识整理成可翻阅、可朗读、可答题、可打卡的本地内容库。

设计上强调三点：

1. **人物可感**：每位人物都有领域标签、事迹简介、关键时间线、资料来源与（部分）真实照片，避免停留在口号式宣传。
2. **学习闭环**：阅读 → 答题 → 错题重练 → 打卡记录 → 学习报告，形成可坚持的日常节奏。
3. **离线可用**：内容随 APK 打包，无账号、无后端、无网络请求，打开即用，适合课堂演示与个人自学。

本项目为课程思政实践作业，仅供学习交流，不作商业用途。

---


### 1.3 v5.2 新增（本次更新）

| 能力 | 安卓 | 网页 / PWA | 说明 |
|---|---|---|---|
| 题库 150 道 | ✅ | ✅ | 新增 50 题，其中 7 道判断题（选项只有「正确 / 错误」） |
| 错题间隔复习 | ✅ | ✅ | 按 1 / 3 / 7 / 15 天排队重练，连续答对 4 次移出错题本 |
| 学习时长统计 | ✅ | ✅ | 今日 / 近 7 天 / 累计 + 7 天柱状图，切后台自动暂停 |
| 每日提醒 | ✅ | ⚠️ | 安卓用 AlarmManager 精确闹钟（20:00 可改）；网页只在页面开着时弹通知，iOS 主屏不支持后台推送 |
| 使用统计 | ✅ | ✅ | 累计启动 / 答题 / 打卡天数 / 导出次数 |
| 搜索可看解析 | ✅ | ✅ | 搜到题目点开直接看答案+解析，不计分 |
| 演示模式 | ✅ | ✅ | 连点「使用统计」5 次进入，独立数据文件，退出/重启自动恢复 |
| 补签卡 / 自动备份 | ✅ | ✅ | 每月 1 张免费补签卡；每天自动备份保留 7 份，可一键恢复 |
| 成就徽章 | ✅ | ✅ | 10 个成就，2 列徽章网格 + 进度 + 新解锁提示 |
| 专注学习模式 | ✅ | ✅（合成音） | 星空+10 种白噪声；安卓用真实录音，网页用 WebAudio 合成 |
| 首屏拆包 | — | ✅ | `index.html` 183 KB + `photos.js` 430 KB 异步加载，另有单文件版 `追光者.html` |
| 一键构建 | — | — | `D:\workplace\build_all.ps1`（或双击 `build_all.bat`），支持 `-Only web/win/apk`、`-Package` |

> 旧错题（没有复习等级数据）升级后按「等级 0、今天到期」平滑迁移，不会丢。

> 版本历史见 [CHANGELOG.md](CHANGELOG.md)（v1.0 → v5.3）。

## 二、功能模块一览

| 模块 | 入口 | 核心内容 |
| --- | --- | --- |
| 人物卡牌 | 底栏「人物」 | 12 位科技工作者；领域筛选 chips；卡片左右滑动；详情页含照片、事迹、时间线、朗读、收藏、做 TA 的题、分享卡 |
| 每日一学 | 底栏「每日一学」 | 每日 1 条名言（可上一条 / 下一条、朗读）；今日 3 条科技小知识（按日期轮换）；名言库共 12 条 |
| 答题 | 「我的」页 | 每日一测（3 题/日，当天测过后按钮变灰不可按，次日恢复）、分类练习（人物篇 / 常识篇 / 思政篇，各 5 题，每类当天首局计分、练过显示「已练」）、错题本（重练答对即移出，当天首局计分，长按按钮可清空）、限时挑战（60 秒，每天积分上限 20 分，局数不限）；抽题按「日期 + 本机随机盐」洗牌，不同设备同一天也不是同一套题；错题本与「做 TA 的题」同样当天只计首局，防止反复刷分 |
| 打卡 | 底栏「打卡」 | 今日打卡 + 心得；连续 / 累计 / 本月 / 最长连续统计；月历；补签（消耗 20 分）；热力图与心得汇总在「我的」页 |
| 我的 | 底栏「我的」 | 积分与徽章、学习报告长图导出、每日提醒、备份导出 / 导入（两者都支持自定义文件名，Android 10+ 直接存入系统「下载」）、字号三档、深色三档、全局搜索、关于与免责声明 |
| 桌面小组件 | 长按桌面 → 组件 → 追光者 | **2×2** 组件：积分 + 徽章 + 升级进度条 + 「今日已打卡 / 点我打卡」胶囊（未打卡可一键打卡 +10 分）+ 打卡天数 / 已读人物 / 错题数；点击打开 App，数据随 App 前台刷新与系统 30 分钟周期刷新 |

完整的页面结构与交互规则见 [FEATURES.md](FEATURES.md)。

---

## 三、技术栈

| 类别 | 选型 |
| --- | --- |
| 开发语言 | Java（source / target 17） |
| UI 体系 | Material 3：`com.google.android.material:material:1.12.0`，配合 `androidx.appcompat:appcompat:1.7.0` |
| 页面容器 | `androidx.viewpager2:viewpager2:1.1.0`（人物卡牌横向滑动、引导页横向滑动） |
| 构建工具 | Gradle 8.13，Android Gradle Plugin 8.13.0 |
| 编译 / 目标 SDK | `compileSdk = 36`，`targetSdk = 36` |
| 最低支持 | `minSdk = 26`（Android 8.0） |
| 数据存储 | `SharedPreferences`（文件名 `zhuiguang`）+ `assets` 内 JSON |
| 内容读取 | `org.json` 解析 `content.json` / `knowledge.json` / `quiz.json` |
| 系统能力 | `TextToSpeech`（中文朗读）、`AlarmManager` + `NotificationManager`（每日提醒）、`FileProvider` + `Canvas`（分享卡 / 报告长图）、`ACTION_OPEN_DOCUMENT`（备份导入）、`AppWidgetProvider` + `RemoteViews`（桌面小组件）、`MediaStore.Downloads`（导出落盘） |
| 后端 | 无。不请求网络、不上传任何数据 |

工程未引入第三方网络库、图片加载库或数据库框架，依赖数量刻意保持精简，便于课程答辩时讲清每一处实现。

---

## 四、内容规模与来源

### 4.1 人物（12 位）

| 人物 | 领域 | 照片 |
| --- | --- | --- |
| 黄芊芊 | 芯片 | 有 |
| 徐颖 | 北斗导航 | 有 |
| 桂海潮 | 航天 | 有 |
| 赵洋 | 深海装备 | 无 |
| 金海族 | 新能源电池 | 无 |
| 陈蕾 | 医学 | 有 |
| 于宗仁 | 文物保护 | 无 |
| 黄桂云 | 植物保护 | 有 |
| 孔海南 | 生态治理 | 有 |
| 苏权科 | 桥梁工程 | 有 |
| 徐洪杰 | 核能与光源 | 无 |
| 宋仁德 | 畜牧科技 | 无 |

其中 7 位配有真实照片（黄芊芊、徐颖、桂海潮、陈蕾、黄桂云、苏权科、孔海南），其余 5 位使用首字头像占位。

### 4.2 其他内容

- **名言 12 条**：徐洪杰、金海族、孔海南、苏权科，以及钱学森、黄大年、袁隆平、南仁东、王淦昌、华罗庚、李四光、茅以升等前辈的公开引述。
- **科技小知识 50 条**：覆盖芯片制程、北斗、航天、深海、电池、医学、生态、桥梁等主题；每天按日期随机取 3 条，同一天内保持不变。
- **题库 150 道**：单选/判断题，每题附解析；程序按题干关键词自动归入「人物篇 / 常识篇 / 思政篇」，无需人工维护分类字段。

### 4.3 资料来源

人物事迹依据以下公开报道整理：

- 人民日报《走近"最美科技工作者"》
- 北京大学新闻网《黄芊芊：芯片突围者》及北大集成电路学院新闻
- 中国科学报《徐颖：可否不叫我"北斗女神"？》及人民网相关报道

名言与部分常识为公开报道中的常见引述或科普表述。**正式引用前请核对原始出处**；图片版权归原作者及原媒体所有。

---

## 五、运行方式

### 5.1 环境要求

- JDK 17
- Android Studio（支持 AGP 8.13）或命令行 Gradle 8.13
- Android 设备 / 模拟器：Android 8.0（API 26）及以上

### 5.2 命令行构建

Windows：

```bat
cd D:\workplace\Zhuiguang
gradlew.bat assembleDebug
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

macOS / Linux：

```bash
cd /path/to/Zhuiguang
./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

构建产物路径：`app/build/outputs/apk/debug/app-debug.apk`。

### 5.3 直接安装 APK

若已拿到构建好的 APK，可在手机上允许「安装未知来源应用」后直接点击安装；或执行：

```bash
adb install -r <apk 路径>
```

> 说明：本机开发环境的 `gradle/wrapper/gradle-wrapper.properties` 指向本地 Gradle 8.13 发行包；换到其他机器构建时，请改用官方 `distributionUrl`，或直接使用 Android Studio 自带的 Gradle。

### 5.4 首次启动

启动页停留约 1.1 秒后自动跳转：首次安装进入 3 屏引导页，完成或跳过后进入主界面；之后启动直接进入主界面。若要重新体验引导页，可在系统设置中清除应用数据。

### 5.5 现成交付物（四个压缩包）

`Zhuiguang/` 根目录下的四个 zip 即全部成品，按平台各一包：

| 文件 | 大小 | 内容 | 适用 |
| --- | --- | --- | --- |
| 追光者-安卓版.zip | 9.82 MB | `追光者-v5.3.apk`（签名 release）+ `备份工坊-v1.0.apk`（可选测试工具）+ `安装说明.txt` | Android 8.0+ |
| `追光者-Windows版.zip` | 0.94 MB | `追光者-Setup.exe`（安装包，需管理员，默认装到 `D:\Zhuiguang`）+ `追光者.exe`（免安装版）+ `使用说明.txt` | Windows 10/11 |
| `追光者-网页版(离线PWA).zip` | 0.94 MB | `index.html` + `sw.js` + `manifest.webmanifest` + `icon-192/512.png` + `splash-*.jpg`（10 张 iOS 启动图）+ `使用方法.txt` | iOS Safari / 任意浏览器，支持添加到主屏幕与离线缓存 |
| `追光者-作业材料打包.zip` | 2.31 MB | 汇报 PPTX / PDF、三段补充材料 DOCX / PDF | 提交与答辩材料 |

几个要点：

- **三个平台数据互通**：学习数据都保存在本机（Android 为 SharedPreferences，Web 为 localStorage），导出/导入的备份 JSON 结构一致（`points` / `days` / `read` / `wrong` / `fav` / `notes` / `version`），可以在手机、电脑、网页之间互相搬运。
- **Web 版按 iOS 习惯做过适配**：导出备份 / 报告长图走系统分享面板（主屏模式下手动下载常常存不下来）、跨天自动重算、热力图可点看明细、10 张机型启动图消除白屏、防双击缩放与误选文字。
- **Web 版需要 https**：Service Worker 只在 https（或 localhost）下生效；放到 GitHub Pages / Gitee Pages / Vercel 即可获得永久地址，详见包内 `使用方法.txt`。
- **Windows 版依赖本机 Edge**：启动器调用 Edge 的应用模式打开页面（无地址栏），没有 Edge 时自动改用默认浏览器。
- **签名**：Android release 包用 `keystore/zhuiguang.jks`（alias `zhiguang`）签名，升级同一应用时不要更换签名。

---

## 六、目录结构

```text
Zhuiguang/
├─ app/
│  ├─ build.gradle.kts                 # 模块配置：SDK、依赖、签名（release 构建时）
│  └─ src/main/
│     ├─ AndroidManifest.xml           # 6 个 Activity + 提醒 Receiver + 小组件 Receiver + FileProvider
│     ├─ java/com/example/zhuiguang/
│     │  ├─ SplashActivity.java        # 启动页：判断是否已引导
│     │  ├─ OnboardingActivity.java    # 首次引导：3 屏
│     │  ├─ MainActivity.java          # 主界面：人物 / 每日一学 / 打卡 / 我的
│     │  ├─ QuizActivity.java          # 每日一测 / 分类练习 / 错题重练 / 人物题
│     │  ├─ ChallengeActivity.java     # 限时挑战 60 秒
│     │  ├─ SearchActivity.java        # 全局搜索
│     │  ├─ WidgetProvider.java        # 桌面小组件（2×2）：积分 / 徽章 / 打卡
│     │  ├─ Store.java                 # SharedPreferences 封装：积分、打卡、错题、收藏等
│     │  ├─ Content.java               # assets 内容加载与题目分类
│     │  ├─ Reminder.java              # 每日 20:00 提醒广播
│     │  └─ Ui.java                    # 尺寸等 UI 小工具
│     ├─ assets/
│     │  ├─ content.json               # 12 位人物 + 12 条名言
│     │  ├─ knowledge.json             # 50 条科技小知识
│     │  ├─ quiz.json                  # 150 道题库（含 7 道判断题，均带解析）
│     │  └─ photos/                    # 7 张人物照片
│     └─ res/
│        ├─ drawable/                  # 图标、启动背景、小组件背景等资源
│        ├─ layout/                    # widget_zhuiguang.xml（桌面小组件布局）
│        ├─ mipmap-*/                  # 应用图标
│        ├─ values/                    # strings.xml、themes.xml（Material 3 主题）
│        └─ xml/                       # file_paths.xml（FileProvider）、widget_info.xml（小组件配置）
├─ docs/                               # 本目录：作业文档
│  ├─ README.md
│  ├─ FEATURES.md
│  ├─ DEMO.md
│  └─ CHECKLIST.md
├─ release/                            # 签名后的 Android 成品包（追光者-v5.2.apk）
├─ keystore/zhuiguang.jks              # 签名密钥（勿丢）
├─ web/                                # 网页 / PWA 版源码
│  ├─ index.html                       # 主页面（内容与照片全部内嵌）
│  ├─ sw.js                            # 离线缓存（Service Worker，版本号带构建时间戳）
│  ├─ manifest.webmanifest             # 名称 / 图标 / 全屏 / 竖屏
│  ├─ icon-192.png、icon-512.png        # 主屏幕图标
│  ├─ splash-*.jpg（10 张）              # iOS 启动图，按机型媒体查询自动匹配
│  ├─ 追光者.html                       # 单文件版（无离线缓存，方便直接传阅）
│  └─ 使用方法.txt                       # 托管与 iOS 安装步骤
├─ windows/                            # Windows 版源码与产物
│  ├─ Launcher.cs                      # 启动器：释放网页 + 调 Edge 应用模式
│  ├─ Setup.cs                         # 安装程序：拷贝、快捷方式、卸载项
│  ├─ setup.manifest                   # 请求管理员权限（requireAdministrator）
│  ├─ index.html                       # 内嵌进 exe 的页面
│  ├─ 追光者.ico                        # 多尺寸图标
│  ├─ 追光者.exe                        # 免安装版（654 KB）
│  ├─ 追光者-Setup.exe                  # 安装包（700 KB，需管理员）
│  └─ 使用说明.txt
├─ 追光者-安卓版.zip                      # 交付：Android（apk ×2 + 安装说明）
├─ 追光者-Windows版.zip                   # 交付：Windows（Setup + 便携版 + 说明）
├─ 追光者-网页版(离线PWA).zip              # 交付：Web / PWA（页面 + 图标 + 启动图 + 说明）
├─ 追光者-作业材料打包.zip                 # 交付：PPTX/PDF/DOCX/PDF
├─ gradle/wrapper/                     # Gradle 8.13 wrapper
├─ build.gradle.kts                    # AGP 8.13.0
├─ settings.gradle.kts
├─ gradlew / gradlew.bat
└─ local.properties                    # 本机 SDK 路径（不应提交）
```

---

## 七、数据存储与隐私

所有学习数据保存在应用私有的 `SharedPreferences` 中，文件名为 `zhuiguang`，主要键包括：

| 键 | 含义 |
| --- | --- |
| `points` | 总积分 |
| `days` | 已打卡日期集合 |
| `note_<日期>` | 当天打卡心得 |
| `read` | 已读人物集合 |
| `wrong` | 错题题干集合 |
| `fav` | 收藏的人物集合 |
| `quiz_<日期>` | 当日每日一测得分（≥0 后按钮变灰） |
| `cat_<日期>_<分类>` | 当日某分类练习得分（存在即当天已练过，重复做不计分） |
| `wrongrun_<日期>` | 当日错题重练是否已计分 |
| `person_<日期>_<姓名>` | 当日某人物专属题得分（存在即该人物当天已练过） |
| `challenge_<日期>` | 当日限时挑战局数（统计用，不限制） |
| `challenge_pts_<日期>` | 当日挑战已获得积分（上限 20） |
| `salt` | 本机随机盐，首次启动生成，用于让同一天的题在不同设备上不同 |
| `reminder` | 每日提醒开关 |
| `fontScale` | 字号档位（0 标准 / 1 大 / 2 特大） |
| `darkMode` | 深色模式（0 跟随系统 / 1 浅色 / 2 深色） |
| `onboarded` | 是否已完成首次引导 |

- **不上传服务器**：应用没有网络权限，也不含任何网络请求代码。
- **备份文件**：导出为 JSON（含积分、打卡日期、已读人物、错题、收藏、心得），文件名可自定义，Android 10+ 直接写入系统「下载」目录；导入时覆盖本机对应数据。备份不含答题记录与随机盐。
- **卸载即清除**：移除应用会同时删除 `SharedPreferences` 与缓存中的分享图片。
- **通知权限**：Android 13 及以上首次开启提醒时会请求 `POST_NOTIFICATIONS` 权限，拒绝后仅影响提醒，不影响其他功能。

---

## 八、作者信息

| 项目 | 内容 |
| --- | --- |
| 姓名 | 高乐文 |
| 学校 | 长治学院 |
| 院系 | 物理系 |
| 专业 | 光电信息科学与工程 |
| 学号 | 26435707 |
| 应用包名 | `com.example.zhuiguang` |

---

## 九、免责声明

1. 本应用为课程思政实践作业，仅供学习交流，不作商业用途。
2. 人物事迹依据人民日报、北京大学新闻网、中国科学报等公开报道整理，版权归原作者及原媒体所有。
3. 人物照片取自公开新闻报道，仅用于教学演示；若涉版权问题，请联系作者删除。
4. 名言部分为公开报道中的常见引述，正式引用前请核对原始出处。
5. 打卡、积分、心得等学习记录仅保存在本机，不上传服务器，卸载应用即清除。
6. 题目解析为学习辅助内容，如发现事实错误或表述不当，欢迎指出以便更正。

---

## 十、文档导航

| 文档 | 用途 |
| --- | --- |
| [FEATURES.md](FEATURES.md) | 功能结构图与逐模块说明，适合答辩时讲清「有哪些功能、怎么组织」 |
| [DEMO.md](DEMO.md) | 3–5 分钟演示脚本，按场景给出点击路径、讲解要点与耗时 |
| [CHECKLIST.md](CHECKLIST.md) | 安装后的冒烟自检清单，含勾选框与异常处理建议 |
| `../追光者-安卓版.zip` 等四个 zip | 现成交付物，清单与说明见 5.5 节 |
