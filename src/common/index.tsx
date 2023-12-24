// import '../../common/commonStyle.css';
// import TopNavBar from '../../common/component/TopNavBar';

// export default function DemoPage() {

//     return (
//         <>
//             <TopNavBar />
//             <div className="backGlassBox">
//                 Demo
//             </div>
//         </>
//     )
// }

import './commonStyle.css'
import BackPrev from './component/BackPrev'
import BackToTop from './component/BackToTop'
import TopNavBar from './component/TopNavBar'

export default function DemoPage() {


    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                Demo
            </div>
            <BackPrev />
            <BackToTop />
        </>
    )
}