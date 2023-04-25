import Main from "../layout/main";
import App from "../App";
/***********
 * 路由引入 方式一
 * @description
 * react-router-dom有两种模式
 * BrowserRouter----history模式
 * HashRouter----Hash模式
 * Routes 在应用中的任何位置呈现，将匹配当前位置的一组子路由
 * Route 路由可能是 React Router 应用程序中最重要的部分。它们将 URL 段与组件、数据加载和数据突变相结合。通过路由嵌套，复杂的应用程序布局和数据依赖关系变得简单且具有声明性。
 ************/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Text from "../view/text";

/***
 * 基础路由配置
 **/
const BaseRouter = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<App />}></Route>
          <Route path="/Text" element={<Text />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
