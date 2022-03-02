import { FC, useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ClassNames } from '../utils';

export type NotiferButton = {
  label: string,
  onClick: Function,
  isAsync?: boolean,
  className?: string,
  isNegative?: boolean,
}

export interface Notification {
  title: any,
  body: any,
  icon?: string,
  onClick?: () => any,
  buttons?: NotiferButton[]
}

export interface INotiState extends Notification {
  id: string,
  time: number,
  countDownTime: number,
}

export let CreateNotification = (payload: Notification) => payload;

export const Notifier: FC = () => {
  const [notifications, setNotifications] = useState([] as INotiState[]);
  const countDownTime = 5;

  CreateNotification = (payload: Notification) => {
    const newNoti: INotiState = {
      ...payload,
      id: generateID(),
      time: countDownTime,
      countDownTime
    };
    setNotifications(arr => [...arr, newNoti]);
    return payload;
  }

  if (!notifications.length) return null

  return (
    <div className="Notifier">
      <TransitionGroup className="Notifier__Wraper">
        {notifications.map((item, key) => (
          <CSSTransition
            key={item.id}
            timeout={100}
            classNames="NotifierTransition_Item"
          >
            <NotificationItem
              key={key}
              data={item}
              removeNotification={() => setNotifications(arr => {
                const data = arr.filter(v => v.id !== item.id);
                return data;
              })}
              onChangeTime={time => setNotifications(arr => arr.map(noti => noti.id === item.id ? { ...noti, time } : noti))}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

const NotificationItem: FC<{ data: INotiState, removeNotification: () => any, onChangeTime: (time: number) => any }> = (props) => {
  const { data, removeNotification } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [temp, setTemp] = useState(null as any);

  const handleClose = () => {
    removeNotification();
    clearInterval(temp);
  }

  const handleTimeout = () => {
    if (data.time > 0) props.onChangeTime(data.time - 1);
  };

  useEffect(() => {
    setTemp(setTimeout(handleTimeout, 1000))
    // eslint-disable-next-line
  }, [data.time])

  const handleClickNotification = () => {
    if (!data.onClick) return;
    handleClose();
    data.onClick();
  }

  useEffect(() => {
    if (!data.time && !isLoading) setTimeout(handleClose, 1000);
    // eslint-disable-next-line
  }, [data.time, isLoading])

  return (
    <div
      id={data.id}
      className="Notifier__NotificationItem"
      onMouseEnter={() => clearTimeout(temp)}
      onMouseLeave={() => setTemp(setTimeout(handleTimeout, 1000))}
    >
      <div className="wraper">
        <div className="icon" onClick={handleClickNotification}>
          <img src={data.icon || '/favicon.ico'} alt="" />
        </div>
        <div className="content">
          <div className="title" onClick={handleClickNotification}>{data.title}</div>
          <div className="body" onClick={handleClickNotification}>{data.body}</div>

          {data.buttons && data.buttons.length ? <div className="actions">
            {(() => {
              if (isLoading) return <svg className="loadingIcon" viewBox="0 0 50 50"><circle className="path" cx={25} cy={25} r={20} fill="none" strokeWidth={5} /></svg>
              return data.buttons.map((btnItem, btnKey) => {
                return <button
                  key={btnKey}
                  className={ClassNames({
                    [btnItem.className || '']: true,
                    negative: btnItem.isNegative
                  })}
                  onClick={async () => {
                    if (btnItem.isAsync) setIsLoading(true);
                    await btnItem.onClick();
                    handleClose();
                  }}
                >
                  {btnItem.label}
                </button>
              })
            })()}
          </div> : null}
        </div>
        <div className="btnClose" onClick={handleClose}>
          <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="User-Mobile" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><path d="M17.176,0.2927 C17.566,0.6837 17.566,1.3167 17.176,1.7067 L10.14775,8.7342 L17.1758,15.7612 C17.5668,16.1522 17.5668,16.7842 17.1758,17.1752 C16.9808,17.3702 16.7248,17.4682 16.4688,17.4682 C16.2128,17.4682 15.9568,17.3702 15.7618,17.1752 L8.73375,10.1472 L1.707,17.1747 C1.512,17.3697 1.256,17.4677 1,17.4677 C0.744,17.4677 0.488,17.3697 0.293,17.1747 C-0.098,16.7837 -0.098,16.1517 0.293,15.7607 L7.31975,8.7342 L0.2928,1.7072 C-0.0972,1.3172 -0.0972,0.6842 0.2928,0.2932 C0.6838,-0.0968 1.3168,-0.0968 1.7068,0.2932 L8.73375,7.3202 L15.762,0.2927 C16.152,-0.0973 16.785,-0.0973 17.176,0.2927 Z" id="Combined-Shape" fill="#F2EEE8" /></g></svg>
        </div>
      </div>

      {!isLoading ? <div className="timeoutSlider" style={{ width: `${(data.time / data.countDownTime) * 100}%` }}></div> : null}
    </div>
  )
}

const generateID = function () {
  return Math.random().toString(36).substr(2, 9);
};