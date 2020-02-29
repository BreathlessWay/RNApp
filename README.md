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
