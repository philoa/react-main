import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
const { Header, Sider, Content } = Layout;

/**
 * 布局分布
 **/
export default function Main() {
  const navigate = useNavigate();
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const contentHeight = useMemo(() => {
    let targetHeight = "auto";
    const headerHeight = 70 + 20;
    targetHeight =
      viewHeight - headerHeight < 0 ? 0 : viewHeight - headerHeight;
    return targetHeight;
  }, [viewHeight]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("resize", window.innerHeight);
      setViewHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout-box">
        <Sider>
          <div
            onClick={() => {
              navigate("/Text");
            }}
          >
            测试
          </div>
        </Sider>
        <Layout id="right-box">
          <Header>
            <div>测试</div>
          </Header>
          <Content
            style={{
              maxHeight: `${
                contentHeight !== "auto" ? contentHeight + "px" : contentHeight
              }`,
            }}
          >
            <div className="content-inner-box">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
