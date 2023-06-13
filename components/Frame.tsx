import classes from './Frame.module.scss';

const Frame = () => {
    return <>
        <div className={classes.frameEdge}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={[classes.frameEdge, classes.frameEdgeLeft].join(' ')}></div>
        <div className={[classes.frameEdge, classes.frameEdgeRight].join(' ')}></div>
    </>;
};

export default Frame;