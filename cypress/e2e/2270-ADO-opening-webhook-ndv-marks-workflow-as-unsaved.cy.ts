import { NDV, WorkflowPage } from '../pages';

const workflowPage = new WorkflowPage();
const ndv = new NDV();

describe('ADO-2270 Save button resets on webhook node open', () => {
	it('should not reset the save button if webhook node is opened and closed', () => {
		// setup, load workflow with debughelper node with random seed
		workflowPage.actions.visit();
		workflowPage.actions.addInitialNodeToCanvas('Webhook');
		workflowPage.actions.openNode('Webhook');

		ndv.actions.close();

		cy.ifCanvasVersion(
			() => workflowPage.getters.saveButton().should('not.have.attr', 'disabled'),
			() => workflowPage.getters.saveButton().should('have.attr', 'disabled'),
		);
	});
});
