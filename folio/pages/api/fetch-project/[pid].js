import { pb } from '../../../components/UserAuthentication'

export default async function UpdateProject(req, res) {
    const url = req.url;
    const parts = url.split('/');
    const projectId = parts[parts.length - 1];

    try {
        // fetch project data
        let filter = 'id = "' + projectId + '"';
        const projectList = await pb.collection('projects').getList(1, 1, {
            filter: filter,
        });
        const project = projectList.items[0].page_contents;
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        // res.header('Content-Type', 'application/json');
        console.log(project);
        res.json(project);
    } catch (error) {
        console.error('Failed to update project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
}
