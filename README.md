> 一些问题

1. import时的路径别名配置，先在tsconfig.json中配置paths之后，在需要别名的目录下添加`package.json`文件，添加以下内容
    ```json
    {
      "name": "@"
    }
    ```
