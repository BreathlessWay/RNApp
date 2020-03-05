> 一些问题

1. import 时的路径别名配置，先在 tsconfig.json 中配置 paths 之后，在需要别名的目录下添加`package.json`文件，添加以下内容
   ```json
   {
   	"name": "@"
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
