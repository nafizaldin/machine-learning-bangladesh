'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { LearnMoreBtn } from '@/components/utilityComponents';
import { LeftSvgIcon, RightSvgIcon } from '@/components/base/svgs/SvgIcon';
import Image from 'next/image';
import { useSnapshot } from 'valtio';
import projectStore from '@/store/projectStore';
import Link from 'next/link';

gsap.registerPlugin(Draggable);

// Utility function to create a horizontal looping timeline
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: 'none' },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i]) * 100 +
              gsap.getProperty(el, 'xPercent')
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          xPercent: (i) => xPercents[i],
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(tl.labels['label' + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset);
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
          tl.to(
            item,
            { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond },
            0
          )
            .fromTo(
              item,
              { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
              {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add('label' + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener('resize', onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === 'function') {
      proxy = document.createElement('div');
      let wrap = gsap.utils.wrap(0, 1),
        ratio,
        startProgress,
        draggable,
        dragSnap,
        lastSnap,
        initChangeX,
        wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof InertiaPlugin === 'undefined' &&
        console.warn('InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club');
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: 'x',
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        },
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener('resize', onResize);
  });
  return timeline;
}

// Box component for individual carousel items
const Box = ({ children, onClick, isActive, className = '', ...props }) => (
  <div className={`box ${isActive ? 'active' : ''} ${className}`} onClick={onClick} {...props}>
    <div className="box__inner">{children}</div>
  </div>
);

// Carousel component
const Carousel = ({ children, config = {}, showControls = true, autoplay = false }) => {
  const [showOverflow, setShowOverflow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray('.box', wrapperRef.current);
      loopRef.current = horizontalLoop(boxes, {
        ...config,
        paused: true,
        draggable: true,
        center: true,
        onChange: (element, index) => {
          setCurrentIndex(index);
        },
      });
    }, wrapperRef.current);

    return () => ctx.revert();
  }, [config]);

    useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        loopRef.current && loopRef.current.next({ duration: 0.4, ease: 'power1.inOut' });
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const handlePrev = () => {
    loopRef.current && loopRef.current.previous({ duration: 0.4, ease: 'power1.inOut' });
  };

  const handleNext = () => {
    loopRef.current && loopRef.current.next({ duration: 0.4, ease: 'power1.inOut' });
  };

  const handleToggleOverflow = () => {
    setShowOverflow((prev) => !prev);
  };

  const wrappedChildren = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      onClick: () =>
        loopRef.current && loopRef.current.toIndex(index, { duration: 0.8, ease: 'power1.inOut' }),
      isActive: index === currentIndex,
    })
  );

  return (
    <div className="ca-carousel">
      <div className={`wrapper ${showOverflow ? 'show-overflow' : ''}`} ref={wrapperRef}>
        {wrappedChildren}
      </div>
      {showControls && (
        <div className="button-cont">
          <button className="prev" onClick={handlePrev}>
            <LeftSvgIcon />
          </button>
          {/* <button className="toggle" onClick={handleToggleOverflow}>
            toggle overflow
          </button> */}
          <button className="next" onClick={handleNext}>
            <RightSvgIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const OtherProjects = ({ project }) => {


const [allProject, setAllProject] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch('/project.json');
      if (!res.ok) throw new Error('Failed to fetch project data');
      const data = await res.json();
      setAllProject(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

if (loading) return <p>Loading...</p>;

if (!Array.isArray(allProject)) return <p>Data format error.</p>;

const filteredProjects = allProject
  .filter(p => p.id !== project.id)


  return (
    <div className="container ca-other-projects">
      <div className="center">
        <h1>Other Projects</h1>
        <Carousel showControls={true} config={{ speed: 1, snap: 1 }} autoplay={true}>
          {filteredProjects.map(proj => (

       
            <Box key={proj.id} className="box00" onClick={() => console.log(`Clicked on ${proj.shortName}`)}>
               
                <Image src={proj.featuredImage} alt={`${proj.shortName} Project`} width={500} height={500} />
                  <Link href={`/projects/${proj.slug}`}>
                    <h5>{proj.shortName}</h5>
                  </Link>
            </Box>
        
         
          ))}
        </Carousel>
      </div>
    </div>
  );
};


export { Carousel, Box, OtherProjects };