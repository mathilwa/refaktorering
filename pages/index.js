import React from 'react';
import classNames from 'classnames';
import Head from 'next/head';

import InfoAndInputBox from '../components/InfoAndInputBox';
import envelopeIcon from './icons/envelope.svg';
import personAtDeskIcon from './icons/person-at-desk.svg';
import phoneIcon from './icons/phone.svg';
import plusCircleImage from './icons/plus-circle.svg';
import css from './styles.less';

const JobInputs = ({ items, onItemsChanged }) => {
    const handleAddClick = () => {
        onItemsChanged([
            ...items,
            {
                howMuch: '',
                position: '',
                where: '',
            },
        ]);
    };

    const handleItemChanged = (idx, updatedItem) =>
        onItemsChanged(items.map((job, i) => (i === idx ? updatedItem : job)));

    return (
        <div>
            <ul className={classNames({ [css['u-marginBottom']]: items.length > 0 })}>
                {items.map((job, idx) => (
                    <li key={idx} className={css.jobItem}>
                        <div className={css.jobItemHeader}>
                            <span>Jobb</span>
                        </div>
                        <div className={css.multipleInputContainer}>
                            <label className={css.label}>
                                <span className={css.labelContent}>Hvor jobber du?</span>
                                <input
                                    className={css.field}
                                    type="text"
                                    value={job.where}
                                    placeholder=""
                                    onChange={evt => {
                                        handleItemChanged(idx, { ...job, where: evt.target.value });
                                    }}
                                />
                            </label>

                            <label className={css.label}>
                                <span className={css.labelContent}>Hvor mye jobber du?</span>
                                <input
                                    className={css.field}
                                    type="text"
                                    value={job.howMuch}
                                    placeholder=""
                                    onChange={evt => {
                                        handleItemChanged(idx, { ...job, howMuch: evt.target.value });
                                    }}
                                />
                            </label>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={css.addJobButtonContainer}>
                <button
                    onClick={e => console.log('legg til jobb')}
                    className={classNames(css.button, css.wide)}
                    type="submit"
                >
                    <img className={css.icon} src={plusCircleImage} />
                    <span className={css.iconButtonContent}>Legg til jobb</span>
                </button>
            </div>
        </div>
    );
};

const ReferenceInputs = ({ items, onItemsChanged }) => {
    const handleAddClick = () => {
        onItemsChanged([
            ...items,
            {
                name: '',
                relation: '',
            },
        ]);
    };

    const handleItemChanged = (idx, updatedItem) =>
        onItemsChanged(items.map((w, i) => (i === idx ? updatedItem : w)));

    const referenceRelationshipOptions = ['Tidligere utleier', 'Arbeidsgiver', 'Tidligere arbeidsgiver'].map(
        (relation, index) => ({
            value: index,
            name: relation,
        }),
    );

    return (
        <div>
            <ul className={classNames({ [css['u-marginBottom']]: items.length })}>
                {items.map((reference, idx) => (
                    <li key={idx} className={css.referenceItem}>
                        <div className={css.multipleInputContainer}>
                            <label className={css.label}>
                                <span className={css.labelContent}>Navn på referanse</span>
                                <input
                                    className={css.field}
                                    type="text"
                                    value={reference.name}
                                    placeholder=""
                                    onChange={evt => {
                                        handleItemChanged(idx, { ...reference, name: evt.target.value });
                                    }}
                                />
                            </label>
                            <Dropdown
                                items={referenceRelationshipOptions}
                                selectedValue={reference.relation || null}
                                onChange={value => {
                                    handleItemChanged(idx, {
                                        ...reference,
                                        relation: value,
                                    });
                                }}
                                label="Relasjon til referanse"
                                emptyValue="Velg relasjon"
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className={css.addReferenceButtonContainer}>
                <button
                    onClick={e => console.log('legg til referanse')}
                    className={classNames(css.button, css.wide)}
                    type="submit"
                >
                    <img className={css.icon} src={plusCircleImage} />
                    <span className={css.iconButtonContent}>Legg til referanse</span>
                </button>
            </div>
        </div>
    );
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: null,
            email: null,
            jobs: [],
            references: [],
        };
    }

    render() {
        const { t } = this.props;

        return (
            <div>
                <Head>
                    <title>Lag bolig-CV</title>
                </Head>

                <div className={css.container}>
                    <div className={classNames(css.box, css.headerImageContainer)}></div>

                    <div className={css.introContainer}>
                        <h1>Lag bolig-CV</h1>
                        <p>
                            Når du leter etter en bolig kan det være lurt å{' '}
                            <strong>sende en bolig-CV til utleier</strong>, slik at de blir bedre kjent med deg.
                            <br />
                            <br />
                            Fyll inn litt mer info. om deg selv her, og del lenken med utleiere! Det du skriver her
                            blir kun lagret på din bolig-CV, ikke på din Leile-profil.
                        </p>
                    </div>

                    <>
                        <div className={css.box}>
                            <InfoAndInputBox
                                heading="Kontaktinfo"
                                description="Utleiere bør ha mulighet kontakte deg på telefon og e-post"
                                iconSrc={envelopeIcon}
                            >
                                <div className={classNames(css.boxContent, css.multipleInputContainer)}>
                                    <label className={css.label}>
                                        <span className={css.labelContent}>Telefonnummer</span>
                                        <input
                                            className={css.field}
                                            type="text"
                                            value={this.state.phoneNumber}
                                            placeholder=""
                                            onChange={evt => {
                                                this.setState({ phoneNumber: evt.target.value });
                                            }}
                                        />
                                    </label>
                                    <label className={css.label}>
                                        <span className={css.labelContent}>E-post</span>
                                        <input
                                            className={css.field}
                                            type="text"
                                            value={this.state.email}
                                            placeholder=""
                                            onChange={evt => {
                                                this.setState({ email: evt.target.value });
                                            }}
                                        />
                                    </label>
                                </div>
                            </InfoAndInputBox>
                        </div>

                        <div className={css.box}>
                            <InfoAndInputBox heading="Jobb" iconSrc={personAtDeskIcon}>
                                <div className={css.boxContent}>
                                    <JobInputs
                                        items={this.state.jobs}
                                        onItemsChanged={items => {
                                            this.setState({ jobs: items, jobsError: null });
                                        }}
                                    />
                                </div>
                            </InfoAndInputBox>
                        </div>

                        <div className={css.box}>
                            <InfoAndInputBox
                                heading="Referanser"
                                description="Utleier vil kanskje kontakte dine referanser. Legg til 1-3 referanser dersom du har noen."
                                iconSrc={phoneIcon}
                            >
                                <div className={css.boxContent}>
                                    <ReferenceInputs
                                        items={this.state.references}
                                        onItemsChanged={items => {
                                            this.setState({
                                                references: items,
                                                referencesError: null,
                                            });
                                        }}
                                    />
                                </div>
                            </InfoAndInputBox>
                        </div>
                        <input
                            type="button"
                            value="Lagre"
                            onClick={() => this.handleSaveClick}
                            className={css.button}
                        />
                    </>
                </div>
            </div>
        );
    }

    handleSaveClick = async () => {
        // saveResume
    };
}

export default Home;
