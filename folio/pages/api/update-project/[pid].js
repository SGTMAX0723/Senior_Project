import { pb } from '../../../components/UserAuthentication'

export default async function UpdateProject(req, res) {
    const url = req.url;
    const parts = url.split('/');
    const projectId = parts[parts.length - 1];

    const projectContent = req.body; // retrieve the updated project content from the request body

    try {
        await pb.collection('projects').update(projectId, { 'page_contents': projectContent });
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error(url, error)
        // console.error('Failed to update project:', error);
        res.status(500).json({ error: url });
    }
}