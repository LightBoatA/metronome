import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import { Button, Input } from 'antd';
import { PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';

interface IProps {

}
export const Home: React.FC<IProps> = props => {
    const [bpm, setBpm] = useState(60);
    const [isPlay, setIsPlay] = useState<boolean>(false);

    useEffect(() => {
        let timer: any;
    
        if (isPlay) {
          timer = setInterval(() => {
            // 在这里执行每个节拍的逻辑
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

    return useMemo(() => {
        return (
            <div className="page-home">
                <div className="control-wrap">
                    <Input
                        className='ipt-bpm'
                        value={bpm}
                        onChange={(e: any) => setBpm(e.target.value)}
                    />
                    <Button
                        className={`btn-control ${ isPlay ? 'stop' : 'play'}`}
                        onClick={() => { setIsPlay(!isPlay) }}
                    />
                </div>
            </div>
        );
    }, [bpm, isPlay]);
};

export default Home;