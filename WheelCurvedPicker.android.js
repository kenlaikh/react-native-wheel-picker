"use strict";

import React from "react";
import PropTypes from "prop-types";
import { View, ColorPropType, requireNativeComponent } from "react-native";

const defaultItemStyle = { color: "white", fontSize: 26 };

const WheelCurvedPickerNativeInterface = {
  name: "WheelCurvedPicker",
  propTypes: {
    ...View.propTypes,
    data: PropTypes.array,
    textColor: ColorPropType,
    textSize: PropTypes.number,
    selectTextColor: ColorPropType,
    itemSpace: PropTypes.number,
    curtain: PropTypes.bool,
    curtainColor: ColorPropType,
    indicator: PropTypes.bool,
    indicatorColor: ColorPropType,
    indicatorSize: PropTypes.number,
    atmospheric: PropTypes.bool,
    curved: PropTypes.bool,
    visibleItemCount: PropTypes.number,
    onValueChange: PropTypes.func,
    selectedIndex: PropTypes.number
  }
};

const WheelCurvedPickerNative = requireNativeComponent(
  "WheelCurvedPicker",
  WheelCurvedPickerNativeInterface
);

class WheelCurvedPicker extends React.Component {
  propTypes: {
    ...View.propTypes,

    data: PropTypes.array,

    textColor: ColorPropType,

    textSize: PropTypes.number,

    selectTextColor: ColorPropType,

    itemStyle: PropTypes.object,

    itemSpace: PropTypes.number,

    onValueChange: PropTypes.func,

    selectedValue: PropTypes.any,

    selectedIndex: PropTypes.number,

    indicator: PropTypes.bool,

    indicatorStyle: PropTypes.object,

    indicatorSize: PropTypes.number,

    indicatorColor: ColorPropType,

    curtain: PropTypes.bool,

    curtainColor: ColorPropType,

    atmospheric: React.PropTypes.bool,

    curved: React.PropTypes.bool,

    visibleItemCount: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  static defaultProps = {
    itemStyle: { color: "white", fontSize: 26 },
    indicatorStyle: { color: "#33000000", fontSize: 2 },
    itemSpace: 20
  };

  componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
  }

  _stateFromProps(props) {
    var selectedIndex = 0;
    var items = [];
    React.Children.forEach(props.children, function(child, index) {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({ value: child.props.value, label: child.props.label });
    });

    var textSize = props.itemStyle.fontSize;
    var textColor = props.itemStyle.color;
    var selectTextColor = props.selectTextColor;
    var itemSpace = props.itemSpace;
    var indicator = props.indicator;
    var indicatorColor = props.indicatorStyle.color;
    var indicatorSize = props.indicatorStyle.fontSize;
    var curtain = props.curtain;
    var curtainColor = props.curtainColor;
    var atmospheric = props.atmospheric;
    var curved = props.curved;
    var visibleItemCount = props.visibleItemCount;

    return {
      selectedIndex,
      items,
      textSize,
      textColor,
      selectTextColor,
      itemSpace,
      indicator,
      indicatorColor,
      indicatorSize,
      curtain,
      curtainColor,
      atmospheric,
      curved,
      visibleItemCount
    };
  }

  _onValueChange = e => {
    if (this.props.onValueChange) {
      this.props.onValueChange(e.nativeEvent.data, e.nativeEvent.index);
    }
  };

  render() {
    return (
      <WheelCurvedPickerNative
        {...this.props}
        onValueChange={this._onValueChange}
        data={this.state.items}
        selectedIndex={parseInt(this.state.selectedIndex)}
        textColor={this.state.textColor}
        textSize={this.state.textSize}
        selectTextColor={this.state.selectTextColor}
        itemSpace={this.state.itemSpace}
        indicator={this.state.indicator}
        indicatorColor={this.state.indicatorColor}
        indicatorSize={this.state.indicatorSize}
        curtain={this.state.curtain}
        atmospheric={this.state.atmospheric}
        curved={this.state.curved}
        visibleItemCount={this.state.visibleItemCount}
      />
    );
  }
}

class Item extends React.Component {
  propTypes: {
    value: React.PropTypes.any, // string or integer basically
    label: React.PropTypes.string
  };

  render() {
    // These items don't get rendered directly.
    return null;
  }
}

WheelCurvedPicker.Item = Item;

module.exports = WheelCurvedPicker;
