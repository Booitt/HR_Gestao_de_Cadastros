import StyledLayout from "./styled";

const Layout = ({ children, noMaxHeight, ...props }) => {
	return (
		<StyledLayout>
			<StyledLayout.Content {...props} noMaxHeight={noMaxHeight}>{children}</StyledLayout.Content>
		</StyledLayout>
	);
};

export default Layout;
