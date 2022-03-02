import React, { FC, useEffect, useState } from 'react'
import { Icon } from '../components';
import { ClassNames } from '../modules/utils';

interface IWithModalWraperSettings {
  title?: string,
  className?: string,
  bind?: (configs: ContentProps) => void,
}

interface ContentProps {
  offModal: () => any,
  onModal: (data?: any) => any,
  data: any,
  setTitle: (title: string) => any,
}

export const withModalWraper = (configs: IWithModalWraperSettings) => (Component: FC<ContentProps>) => (props: any) => {
  const [state, setState] = useState({ data: null, id: null } as { id: any, data: any });
  const [title, setTitle] = useState(configs?.title || 'Modal Title');

  const offModal = () => setState({ data: null, id: null });
  const onModal = (data: any) => setState({ data, id: `${Date.now()}` });

  useEffect(() => {
    if (configs.bind) configs.bind({
      offModal,
      onModal,
      setTitle: (t) => setTitle(t),
      data: state.data
    });
  }, [])

  if (!state.id) return null

  return <div
    id={state.id}
    className={ClassNames({
      Modal: true,
      [`${configs.className}`]: !!configs.className
    })}
    onClick={(e: any) => e.target.id === state.id && offModal()}
  >
    <div className="box">
      <div className="head">
        <div className="title">{title}</div>
        <div className="btnClose" onClick={offModal}>
          <Icon.Close />
        </div>
      </div>
      <div className="content">
        <Component
          {...props}
          data={state.data}
          offModal={offModal}
          onModal={onModal}
        />
      </div>
    </div>
  </div>
}