### React-Native 的练习项目

修改`/RNApp/index.js`的入口可启动不同的项目

- GitHub Trending： `import App from 'trending/App'`
- 豆瓣：`import App from 'douban/App'`

> 项目介绍 ~~因为懒，所以只测试了 iOS~~

1. GitHub 趋势的 App，使用 React-Native+Mobx+Hooks+Typescript+React-Navigation 开发

   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-github-popular.png)
   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-github-trend.png)
   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-github-me.png)
   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-github-about.png)

2. 豆瓣 App，使用 React-Native+Hooks+Context+Typescript+React-Navigation 开发

   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-douban-book.png)
   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-douban-music.png)
   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-douban-movie-hot.png)
   ![image](https://raw.githubusercontent.com/BreathlessWay/RNApp/master/screenshort/rn-doouban-movie-top.png)

3. TODO CNode App，使用 React-Native+Redux+RxJs+Hook+Typescript+React-Navigation 开发

> 一些问题

1. import 时的路径别名配置，先在 tsconfig.json 中配置 paths 之后，在需要别名的目录下添加`package.json`文件，添加以下内容
   ```json
   {
   	"name": "trending"
   }
   ```
2. ios9 只能使用 https 的请求，需要[修改配置](https://segmentfault.com/a/1190000002933776)
3. 长列表推荐使用 FlatList，FlatList 会安排视图的渲染，只显示当前在屏幕上的那些元素。而那些已经渲染好了但移动到了屏幕之外的元素，则会从原生视图结构中移除（以提高性能）。
4. Dimensions 的 window 和 screen 的区别
   - Screen and window dimensions are different on android
   - window: reports width/height without the soft menu bar
   - screen: reports entire screen's width/height
5. 使用`react-native-vector-icons`出现`Unrecognized font family 'Material Icons'`
   - 使用 Xcode 打开项目, 在根目录下右击选择`Add file to <项目名称>`, 找到`node_modules/react-native-vector-icons/Fonts`
   - 在 xcode 的 Info.plist 文件中,加入
     ```
     <key>UIAppFonts</key>
     <array>
       <string>AntDesign.ttf</string>
       <string>Entypo.ttf</string>
       <string>EvilIcons.ttf</string>
       <string>Feather.ttf</string>
       <string>FontAwesome.ttf</string>
       <string>FontAwesome5_Brands.ttf</string>
       <string>FontAwesome5_Regular.ttf</string>
       <string>FontAwesome5_Solid.ttf</string>
       <string>Foundation.ttf</string>
       <string>Ionicons.ttf</string>
       <string>MaterialIcons.ttf</string>
       <string>MaterialCommunityIcons.ttf</string>
       <string>SimpleLineIcons.ttf</string>
       <string>Octicons.ttf</string>
       <string>Zocial.ttf</string>
     </array>
     ```
   - 重新`run ios`
6. 用 mobx-persist 进行 hydrate 的 store 必须要有 persist，不然会报错
7. fetch 对于 404 或 500 不会 reject，而是 resolve，但是在 resolve 中会标记 ok 为 false，且不会默认携带 cookie，需要配置 credentials
   - omit: 从不发送 cookies.
   - same-origin: 只有当 URL 与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如 safari 11 依旧是 omit，safari 12 已更改)
   - include: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.
   - 默认值是：同源的时候发送，不同源的时候不发送。并且这个默认值在不同的浏览器中同一浏览器不同版本中都不同，Safari 11 是完全不发送，Safari 12 是现在的默认值。
8. [react-native-vector-icons 的图标搜索网址](https://oblador.github.io/react-native-vector-icons/)
9. [Toast](https://github.com/crazycodeboy/react-native-easy-toast)： 轻提示
10. [react-native 显示 html](https://github.com/jsdf/react-native-htmlview)：react-native 解析显示 html 文本
11. [react-native-parallax-scroll-view](https://github.com/i6mi6/react-native-parallax-scroll-view): 下拉图片弹性效果
12. React-Native 自带的 Webview 已经被移除了，现在使用[
    react-native-webview](https://github.com/react-native-community/react-native-webview)代替
13. [Homebrew 国内镜像](https://lug.ustc.edu.cn/wiki/mirrors/help/brew.git)
14. 换了机器之后，要先装用 brew 安装 cocoapods，然后 link 一下
15. [The difference is that createRef will always create a new ref. In a class-based component, you would typically put the ref in an instance property during construction (e.g. this.input = createRef()). You don't have this option in a function component. useRef takes care of returning the same ref each time as on the initial rendering.](https://stackoverflow.com/questions/54620698/whats-the-difference-between-useref-and-createref): useRef 和 createRef 的区别
16. [react-native-drag-sort](https://github.com/mochixuan/react-native-drag-sort): react-native 的拖拽组建，需要长按才能触发拖动
17. [AsyncStorage](https://github.com/react-native-community/async-storage): react-native 自带的 AsyncStorage 即将废弃，使用`@react-native-community/async-storage`代替
18. [react-native-swipeable-lists](https://github.com/nicastelo/react-native-swipeable-lists): react-native 侧滑在 0.61 被移除了，需要安装这个库
19. [在线生成阴影样式](https://ethercreative.github.io/react-native-shadow-generator/)
20. 修改默认启动的服务端口号
    ```
    // 修改 metro.config.js
    module.exports = {
      ...
      server: {
        port: 8082,
      },
    }
    ```
21. [react-native-camera](https://react-native-community.github.io/react-native-camera/docs/installation.html): react-native 扫描识别二维码
