import React, { useEffect, useContext } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Icon from "@material-ui/core/Icon";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { UserContext } from "context";

import styles from "assets/jss/material-kit-react/components/customTabsStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);

  const { data } = useContext(UserContext);

  const handleChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    if((data.selectedData.secondary_section.length-1) < value)
      setValue(0)
  }, [data.selectedData])
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive,
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={(e, v) => {
            handleChange(e, v);
            if (typeof props.onActive == "function") {
              props.onActive(v);
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
          }}
          inkBarStyle={{background: 'blue'}}
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon:
                  typeof prop.tabIcon === "string" ? (
                    <Icon>{prop.tabIcon}</Icon>
                  ) : (
                    <prop.tabIcon />
                  ),
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  label: classes.tabLabel,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
  onActive: PropTypes.func,
};
