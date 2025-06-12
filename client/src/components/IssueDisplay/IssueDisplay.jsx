import styles from './IssueDisplay.module.css';
import bobaBlue from '../../assets/icons/bobaBlue.png';
import dianaLime from '../../assets/icons/dianaLime.png';
import formaOrange from '../../assets/icons/formaOrange.png';
import prismoPink from '../../assets/icons/prismoPink.png';
import IssueSection from '../IssueSection/IssueSection';

const IssueDisplay = ({ issues, forceReload }) => {
  if (issues.length === 0) {
    return <div className={styles.noIssues}>You have no issues to show!</div>;
  }

  const sections = [
    {
      title: 'Copy revisions',
      description: 'Texts to be changed',
      icon: bobaBlue,
      listName: 'copy revision',
      className: 'revision',
      cardClassName: 'copyCards',
    },
    {
      title: 'Requested Changes',
      description: 'Changes requested by the reviewer',
      icon: dianaLime,
      listName: 'requested change',
      className: 'changes',
      cardClassName: 'changeCards',
    },
    {
      title: 'Design Issues',
      description: 'Design-related issues',
      icon: formaOrange,
      listName: 'design issues',
      className: 'design',
      cardClassName: 'designCards',
    },
    {
      title: 'New Items',
      description: 'New items requested',
      icon: prismoPink,
      listName: 'new item',
      className: 'item',
      cardClassName: 'itemCards',
    },
  ];

  const pendingIssues = issues.filter(issue => issue.status.status === "to do" || issue.status.status === "working");
  const toReviewIssues = issues.filter(issue => issue.status.status === "review required");
  const resolvedIssues = issues.filter(issue => issue.status.status === "complete");

  return (
    <div className={styles.wrapper}>
      <div className={styles.twoColumns}>
        {toReviewIssues && toReviewIssues.length>0 && (
          <>
            <div className={styles.containerDouble}>
              <h2>Issues to be reviewed</h2>
              {sections.map(section => (
                <IssueSection
                  key={section.listName}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  issues={toReviewIssues.filter(toReviewIssues => toReviewIssues.list.name === section.listName)}
                  className={section.className}
                  cardClassName={section.cardClassName}
                  review={true}
                  forceReload={forceReload}
                />
              ))}
            </div>
          </>
        )}
          {pendingIssues && pendingIssues.length>0 && (
            <>
              <div className={styles.containerDouble}>
                <h2>Pending issues</h2>
                {sections.map(section => (
                  <IssueSection
                    key={section.listName}
                    title={section.title}
                    description={section.description}
                    icon={section.icon}
                    issues={pendingIssues.filter(pendingIssues => pendingIssues.list.name === section.listName)}
                    className={section.className}
                    cardClassName={section.cardClassName}
                  />
                ))}
              </div>
            </>
          )}
      </div>
      {resolvedIssues && resolvedIssues.length>0 && (
        <>
        <div className={styles.finished}>
          <div className={styles.lastContainer}>
            <h2>Resolved issues</h2>
            {sections.map(section => (
              <IssueSection
                key={section.listName}
                title={section.title}
                description={section.description}
                icon={section.icon}
                issues={resolvedIssues.filter(resolvedIssues => resolvedIssues.list.name === section.listName)}
                className={section.className}
                cardClassName={section.cardClassName}
              />
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default IssueDisplay;

