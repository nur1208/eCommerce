import { TopBarIconContainer, TopIconBadge } from "./tobBarSC";

export const renderTopBarIconContainer = (topBarIcons) => {
  return topBarIcons.map(
    ({ icon, badge, handleOnClick }, index) => (
      <TopBarIconContainer onClick={handleOnClick}>
        {icon}{" "}
        {badge && (
          <TopIconBadge id="TopIconBadge">{badge}</TopIconBadge>
        )}
      </TopBarIconContainer>
    )
  );
};
