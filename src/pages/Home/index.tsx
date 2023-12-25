import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.less';
import { Button, Form, Input } from 'antd';
import { PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { writeToPresets } from './common';

interface IProps {

}
export const Home: React.FC<IProps> = props => {
  const [bpm, setBpm] = useState(60);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    let timer: any;

    if (isPlay) {
      timer = setInterval(() => {
        console.log('Tick!');
        // 播放音频
        // const audioElement = new Audio('/path/to/tick.mp3');
        // audioElement.play();
      }, (60 / bpm) * 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [bpm, isPlay]);

  const addPresets = useCallback(async () => {
    const _res = await form.validateFields();
    if (_res) {
      writeToPresets(_res)
    }
  }, [form])
  return useMemo(() => {
    return (
      <div className="page-home">
        <div className="presets">
          {/* <div className="presets-add"> */}
          <Form form={form} className="presets-add">
            <Form.Item name="title" label="曲名" rules={[{ required: true }]} className='mr20'>
              <Input />
            </Form.Item>
            <Form.Item name="bpm" label="曲速" rules={[{ required: true, type: 'number' }]} className='mr20'>
              <Input />
            </Form.Item>
            <Button shape='circle' onClick={addPresets} >+</Button>
          </Form>
          {/* </div> */}
        </div>
        <div className="control-wrap">
          <Input
            className='ipt-bpm'
            value={bpm}
            onChange={(e: any) => setBpm(e.target.value)}
          />
          <Button
            className={`btn-control ${isPlay ? 'stop' : 'play'}`}
            onClick={() => { setIsPlay(!isPlay) }}
          />
        </div>
      </div>
    );
  }, [addPresets, bpm, form, isPlay]);
};

export default Home;