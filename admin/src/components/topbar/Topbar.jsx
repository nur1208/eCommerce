import React from "react";
import {
  Logo,
  TopAvatar,
  TopBarContainer,
  TopBarInnerContainer,
  TopLeft,
  TopRight,
} from "./tobBarSC";
import { renderTopBarIconContainer } from "./utils";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToApp,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";

export const Topbar = () => {
  const dispatch = useDispatch(null);

  const handleLogout = () => {
    dispatch(logout());
    // console.log("logout");
  };

  const topBarIcons = [
    { icon: <NotificationsNone />, badge: 2 },
    { icon: <Language />, badge: 2 },
    { icon: <Settings /> },
    { icon: <ExitToApp />, handleOnClick: handleLogout },
  ];

  return (
    <TopBarContainer id="TopBarContainer">
      <TopBarInnerContainer id="TopBarInnerContainer">
        <TopLeft id="TopLeft">
          <Logo id="Logo">lamaadmin</Logo>
        </TopLeft>
        <TopRight id="TopRight">
          {renderTopBarIconContainer(topBarIcons)}
          <TopAvatar
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="top-avatar"
          />
        </TopRight>
      </TopBarInnerContainer>
    </TopBarContainer>
  );
};
