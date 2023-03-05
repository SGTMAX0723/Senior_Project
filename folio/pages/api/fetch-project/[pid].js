import { pb } from '../../../components/UserAuthentication'

export default async function UpdateProject(req, res) {
    const url = req.url;
    const parts = url.split('/');
    const projectId = parts[parts.length - 1];

    try {
        // fetch a paginated records list
        let filter = 'created >= "2022-01-01 00:00:00" && id = "' + projectId + '"';
        const projectList = await pb.collection('projects').getList(1, 50, {
            filter: filter,
        });
        res.status(200).json({ message: 'Project fetched successfully' });
        return projectList[0].page_contents;
    } catch (error) {
        console.log(req)
        console.error('Failed to update project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
}