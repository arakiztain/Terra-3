

const IssueCard = ({issue}) => {
    return (
        <div className="issue-card">
            <div><strong>Task:</strong> {issue.name}</div>
            <div><strong>Status:</strong> {issue.status?.status}</div>
            <div><strong>Created by:</strong> {issue.creator?.username} ({issue.creator?.email})</div>
            <div><strong>Assignees:</strong> {issue.assignees?.map(a => a.username).join(', ')}</div>
            <div><strong>Created on:</strong> {issue.date_created}</div>
            <div>
                <strong>Link:</strong>{' '}
                <a href={issue.url} target="_blank" rel="noopener noreferrer">
                Open in ClickUp
                </a>
            </div>
            <div><strong>List:</strong> {issue.list?.name}</div>
            <div><strong>Project:</strong> {issue.project?.name}</div>
        </div>
    )
}

export default IssueCard