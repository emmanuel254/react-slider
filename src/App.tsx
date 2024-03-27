import React, {useEffect, useRef} from 'react';
// @ts-ignore
import $ from 'jquery';
// @ts-ignore
import './App.css';
// @ts-ignore
import Hammer from 'hammerjs';

function App() {
    // console.log($(".prev").classList);
    const swipeRef = useRef(null);
    useEffect(() => {
        if (swipeRef.current) {
            const hammer = new Hammer(swipeRef.current);
            hammer.on('swipeleft', () => {
                next();
            });

            hammer.on('swiperight', () => {
                prev();
            });
        }
    }, []);

    const next = () => {
        if ($(".hide")) {
            $(".hide").remove();
        }

        /* Step */

        if ($(".prev")[0]) {
            $(".prev")[0].classList.add("hide");
            $(".prev")[0].classList.remove("prev");
        }

        $(".act")[0].classList.add("prev");
        $(".act")[0].classList.remove("act");

        $(".next")[0].classList.add("act");
        $(".next")[0].classList.remove("next");

        /* New Next */

        $(".new-next")[0].classList.remove("new-next");

        const addedEl = document.createElement('li');

        $(".list")[0].appendChild(addedEl);
        addedEl.classList.add("next","new-next");
    }

    const prev = () =>  {
        $(".new-next").remove();

        /* Step */

        $(".next")[0].classList.add("new-next");

        $(".act")[0].classList.add("next");
        $(".act")[0].classList.remove("act");

        $(".prev")[0].classList.add("act");
        $(".prev")[0].classList.remove("prev");

        /* New Prev */

        $(".hide")[0].classList.add("prev");
        $(".hide")[0].classList.remove("hide");

        const addedEl = document.createElement('li');

        $(".list")[0].insertBefore(addedEl, $(".list").firstChild);
        addedEl.classList.add("hide");
    }

    let slide = (element: any) => {
        /* Next slide */

        if (element.classList.contains('next')) {
            next();

            /* Previous slide */

        } else if (element.classList.contains('prev')) {
            prev();
        }
    }

    return (
        <div className="App" ref={swipeRef}>
            <div onClick={(event) => slide(event.target)}>
                <ul className="list">
                    <li className="hide"></li>
                    <li className="prev"></li>
                    <li className="act"></li>
                    <li className="next"></li>
                    <li className="next new-next"></li>
                </ul>
            </div>
            <div className="swipe" ></div>
        </div>
    );
}

export default App;
