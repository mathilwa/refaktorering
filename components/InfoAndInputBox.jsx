import classNames from 'classnames';
import React from 'react';
import css from './info-and-input-box.less';

const InfoAndInputBox = ({
    heading,
    description,
    iconSrc,
    withoutIconBackground = false,
    children,
    elementRef,
}) => (
    <div className={css.infoAndInputContainer} ref={elementRef}>
        <div className={classNames(css.info, { [css.withDescription]: !!description })}>
            <div className={classNames(css.iconContainer)}>
                <div className={classNames(css.icon, { [css.iconWithBackground]: !withoutIconBackground })}>
                    <img src={iconSrc} />
                </div>
            </div>
            <div className={css.heading}>{heading}</div>
            {description ? <div className={css.description}>{description}</div> : null}
        </div>
        {children}
    </div>
);

export default InfoAndInputBox;
