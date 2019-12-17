import React from "react";
import { shallow } from "enzyme";
import PageLoader from "../../../../../components/ui/pageLoader/PageLoader";
import PurchaseMainPure from "../PurchaseMainPure";
import SimplePurchaseForm from "../../SimplePurchaseForm/SimplePurchaseForm";
import LimitPurchaseForm from "../../LimitPurchaseForm/LimitPurchaseForm";
import MarketPurchaseForm from "../../MarketPurchaseForm/MarketPurchaseForm";
import UITradingSecuritiesForm from "../../TradingSecuritiesForm/UITradingSecuritiesForm";
import TradeUIObject from "../../../../TradingSecuritiesSellPage/components/TradeUIObject/TradeUIObject";
import InvitingScreen from "../../../../../components/molecules/InvitingScreen/InvitingScreen";

describe("PurchaseMainPure", () => {
  const defaultProps = {
    media: { tablets: true },
    setBackUrl: jest.fn()
  };
  let component;
  const shallowWithProps = props =>
    shallow(<PurchaseMainPure {...defaultProps} {...props} />);

  it("рендерится", () => {
    component = shallowWithProps();

    expect(component).toBeDefined();
  });

  it("Должен выбирать форму-приглашение, если пользователь не авторизован", () => {
    component = shallowWithProps({
      isClient: false,
      isAuthorized: false,
      allAccountsLoaded: false,
      security: { foo: "bar" }
    }).renderProp("children")();

    expect(component.find(UITradingSecuritiesForm).length).toEqual(0);
    expect(component.find(InvitingScreen).length).toEqual(1);
  });

  it("Должен выбирать новую форму-приглашение, если пользователь авторизован, но нет счета ТКС", () => {
    component = shallowWithProps({
      isClient: true,
      isAuthorized: true,
      allAccountsLoaded: true,
      isAccountsLoaded: true,
      security: { foo: "bar" },
      withoutBrokerAccount: true
    }).renderProp("children")();

    expect(component.find(PageLoader).length).toEqual(0);
    expect(component.find(UITradingSecuritiesForm).length).toEqual(0);
    expect(component.find(InvitingScreen).length).toEqual(1);
  });

  it("Должен выбирать одну из новых форм, если пользователь авторизован, и есть счет ТКС", () => {
    component = shallowWithProps({
      isClient: true,
      isAuthorized: true,
      allAccountsLoaded: true,
      isAccountsLoaded: true,
      security: { foo: "bar" }
    }).renderProp("children")();

    expect(component.find(UITradingSecuritiesForm).length).toEqual(0);
    expect(
      component
        .find(TradeUIObject)
        .renderProp("children")("simple")
        .find(SimplePurchaseForm).length
    ).toEqual(1);

    expect(
      component
        .find(TradeUIObject)
        .renderProp("children")("limit")
        .find(LimitPurchaseForm).length
    ).toEqual(1);

    expect(
      component
        .find(TradeUIObject)
        .renderProp("children")("market")
        .find(MarketPurchaseForm).length
    ).toEqual(1);
  });
});

import React from "react";
import { shallow } from "enzyme";
import BrokerAccountW8Pure from "../BrokerAccountW8Pure";
import Verification from "../../W8FormStatus/Verification";
import Rejected from "../../W8FormStatus/Rejected";
import Sign from "../../W8FormStatus/Sign";
import {
  W8_PROCESSING,
  W8_SENT_TO_BCS,
  W8_BCS_DECLINED
} from "../../../../../constants/w8";

describe("Разводящий компонент на странице О Счете. BrokerAccountW8", () => {
  it("Не должен ничего отрисовать", () => {
    const component = shallow(<BrokerAccountW8Pure w8Status="" />);

    expect(component.getElement()).toBe(null);
  });

  it("Должен отрисовать плашку с успешным подписанием", () => {
    const component = shallow(<BrokerAccountW8Pure approvedW8 w8Status="" />);

    expect(component.find("div")).toBeTruthy();
  });

  it("Должен отрисовать Verification 1", () => {
    const component = shallow(
      <BrokerAccountW8Pure approvedW8={false} w8Status={W8_PROCESSING} />
    );

    expect(component.find(Verification)).toHaveLength(1);
  });

  it("Должен отрисовать Verification 2", () => {
    const component = shallow(
      <BrokerAccountW8Pure approvedW8={false} w8Status={W8_SENT_TO_BCS} />
    );

    expect(component.find(Verification)).toHaveLength(1);
  });

  it("Должен отрисовать Rejected", () => {
    const component = shallow(
      <BrokerAccountW8Pure approvedW8={false} w8Status={W8_BCS_DECLINED} />
    );

    expect(component.find(Rejected)).toHaveLength(1);
  });

  it("Должен отрисовать Sign", () => {
    const component = shallow(
      <BrokerAccountW8Pure approvedW8={false} w8Status="QWERTY" />
    );

    expect(component.find(Sign)).toHaveLength(1);
  });
});

import React from "react";
import { mount } from "enzyme";
import Delayed, {
  WITHOUT_LOADER_INTERVAL,
  MIN_DISPLAY_LOADER_INTERVAL
} from "../Delayed";

let component;

describe("DelayedLoader", () => {
  beforeEach(() => {
    component = mount(
      <Delayed>
        {isLoading => (isLoading ? <span>Контент</span> : <span>Лоадер</span>)}
      </Delayed>
    );
  });

  it("Только контент", () => {
    expect(component.find("span").length !== 0).toBeTruthy();
  });

  it("Не показывается, если props.loading === true меньше чем WITHOUT_LOADER_INTERVAL", () => {
    component.setProps({ loading: true });
    jest.runTimersToTime(WITHOUT_LOADER_INTERVAL / 2);
    expect(component.instance().state.loading).toBeFalsy();
  });

  it("Показывается, если props.loading === true больше чем WITHOUT_LOADER_INTERVAL", () => {
    component.setProps({ loading: true });
    jest.runTimersToTime(WITHOUT_LOADER_INTERVAL * 2);
    expect(component.instance().state.loading).toBeTruthy();
  });

  it("Показывается, если props.loading true > false после WITHOUT_LOADER_INTERVAL меньше чем за MIN_DISPLAY_LOADER_INTERVAL", () => {
    component.setProps({ loading: true });
    jest.runTimersToTime(WITHOUT_LOADER_INTERVAL * 1.2);
    component.setProps({ loading: false });
    jest.runTimersToTime(MIN_DISPLAY_LOADER_INTERVAL / 2);
    expect(component.instance().state.loading).toBeTruthy();
  });

  it("Не показывается, если props.loading true > false после WITHOUT_LOADER_INTERVAL больше чем за MIN_DISPLAY_LOADER_INTERVAL", () => {
    component.setProps({ loading: true });
    jest.runTimersToTime(WITHOUT_LOADER_INTERVAL * 1.2);
    component.setProps({ loading: false });
    jest.runTimersToTime(MIN_DISPLAY_LOADER_INTERVAL * 1.2);
    expect(component.instance().state.loading).toBeFalsy();
  });

  it("Не показывается, если props.loading true > false после WITHOUT_LOADER_INTERVAL больше чем за MIN_DISPLAY_LOADER_INTERVAL (кастомные параметры)", () => {
    const localWithoutLoaderInterval = 0;
    const localDisplayLoaderInterval = 1000;

    component = mount(
      <Delayed
        loading
        withoutLoaderInterval={localWithoutLoaderInterval}
        displayLoaderInterval={localDisplayLoaderInterval}
      >
        {isLoading => (isLoading ? <span>Контент</span> : <span>Лоадер</span>)}
      </Delayed>
    );

    jest.runTimersToTime(localWithoutLoaderInterval * 1.2);
    expect(component.instance().state.loading).toBeTruthy();
    component.setProps({ loading: false });
    jest.runTimersToTime(localDisplayLoaderInterval * 1.2);
    expect(component.instance().state.loading).toBeFalsy();
  });
});

import React from "react";
import { shallow } from "enzyme";
import noop from "@tinkoff/utils/function/noop";
import Interval from "../Interval.jsx.js";

const DELAY = 1000;

describe("Interval", () => {
  beforeEach(() => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it("Рендерит", () => {
    const component = shallow(
      <Interval callback={jest.fn(noop)} delay={DELAY} />
    );

    expect(component.length).not.toBe(0);
  });

  it("Рендерит потомков", () => {
    const callback = jest.fn();
    const component = shallow(
      <Interval callback={callback} delay={DELAY}>
        <div className="test" />
      </Interval>
    );

    expect(component.contains(<div className="test" />)).toBeTruthy();
  });

  it("Вызывает callback", () => {
    const callback = jest.fn();

    shallow(<Interval callback={callback} delay={DELAY} />);

    expect(callback.mock.calls.length).toBe(1);
  });

  it("Периодически вызывает callback после delay", () => {
    const callback = jest.fn();

    shallow(<Interval callback={callback} delay={DELAY} />);

    expect(callback.mock.calls.length).toBe(1);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(2);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(3);
  });

  it("Не вызывает callback для отмонтированного компонента", () => {
    const callback = jest.fn();
    const component = shallow(<Interval callback={callback} delay={DELAY} />);

    expect(callback.mock.calls.length).toBe(1);
    component.unmount();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("Не вызывает callback при монтировании если есть флаг skipFirst", () => {
    const callback = jest.fn();

    shallow(<Interval callback={callback} delay={DELAY} skipFirst />);

    expect(callback.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(2);
  });
});
