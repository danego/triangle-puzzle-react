import classes from './Header.module.scss';

const Header = () => {
    return (
        <div className={classes.panel + ' panel'}>
              <h1 className={classes.header}><em>Triazzle</em> Puzzle Solver</h1>
        </div>
    );
};

export default Header;