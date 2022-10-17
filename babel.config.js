module.exports = {
  plugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "@arco-design/web-react",
        libraryDirectory: "es",
        camel2DashComponentName: false,
        style: true, // 样式按需加载
      },
    ],
  ],
};
