// ref: https://github.com/shfshanyue/2019-ncov

import React, { useState, useEffect } from 'react'
import keyBy from 'lodash.keyby'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Map from './Map'
import Tag from './Tag'

import all from './data/overall.json'
import provinces from './data/area.json'

import './Demo.css'

dayjs.extend(relativeTime)

const provincesByName = keyBy(provinces, 'name')
// const provincesByPinyin = keyBy(provinces, 'pinyin')

function Stat({modifyTime, confirmedCount, suspectedCount, deadCount, curedCount, name}) {
  return (
    <div className="card">
      <h2>
        统计 {name ? `· ${name}` : false}
        <span className="due">
          截止时间: {dayjs(modifyTime).format('YYYY-MM-DD HH:mm')}
        </span>
      </h2>
      <div className="row">
        <Tag number={confirmedCount}>
          确诊
        </Tag>
        <Tag number={suspectedCount || '-'}>
          疑似
        </Tag>
        <Tag number={deadCount}>
          死亡
        </Tag>
        <Tag number={curedCount}>
          治愈
        </Tag>
      </div>
    </div>
  )
}

function Area({area, onChange}) {
  const renderArea = () => {
    return area.map(x => (
      <div className="province" key={x.name || x.cityName} onClick={() => {
        // 表示在省一级
        if (x.name) { onChange(x) } 
      }}>
        <div className={`area ${x.name ? 'active' : ''}`}>
          { x.name || x.cityName }
        </div>
        <div className="confirmed">{ x.confirmedCount }</div>
        <div className="death">{ x.deadCount }</div>
        <div className="cured">{ x.curedCount }</div>
      </div>
    ))
  }

  return <>
      <div className="province header">
        <div className="area">地区</div>
        <div className="confirmed">确诊</div>
        <div className="death">死亡</div>
        <div className="cured">治愈</div>
      </div>
      { renderArea() }
    </>
}

function Header ({ province }) {
  return (
    <header>
      <div className="bg"></div>
      <h1>
        <small>新型冠状病毒</small>
        <br />
        疫情实时动态 · { province ? province.name : '省市地图' }
      </h1>
    </header>
  )
}

function Demo () {
  const [province, _setProvince] = useState(null)

  useEffect(() => {
    if (province) {
      window.document.title = `肺炎疫情实时地图 | ${province.name}`
    }
  }, [province])

  const setProvince = (p) => { _setProvince(p) }

  const data = !province ? provinces.map(p => ({name: p.provinceShortName, value: p.confirmedCount})) : 
  	provincesByName[province.name].cities.map(city => ({name: city.fullCityName, value: city.confirmedCount}))

  const area = province ? provincesByName[province.name].cities : provinces
  const overall = province ? province : all

  return (
    <div className="demo" style={{height:'100%', width:'100%', padding:'30px', overflow:'auto'}}>
      <Header province={province} />
      <Stat { ...overall } name={province && province.name} modifyTime={all.modifyTime} />
      <div className="card">
        <h2>疫情地图 { province ? `· ${province.name}` : false }
        {province ? <small onClick={() => setProvince(null)} style={{cursor:'pointer'}}>返回全国</small> : null}
        </h2>
        <div>
          <Map province={province} data={data} onClick={name => {
            const p = provincesByName[name];
            if (p) { setProvince(p) }
          }} />
          {
            province ? false :
              <div className="tip">
                在地图中点击省份可跳转到相应省份的疫情地图，并查看该省相关的实时动态
              </div>
          }
        </div>
        <Area area={area} onChange={setProvince} />
      </div>
    </div>
  );
}

export default Demo;
