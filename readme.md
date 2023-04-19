# ToDo app

## Source
This app has been created by Bing ChatGPT.

## Bug reports

### Bug #01 Deleting behaviour
If there are two ToDo entries with the same string, they are both deleted.
#### how to reproduce
Add a ToDo with the same name twice. Then press the delete button beside one of the entries in the list. Both entries are deleted.
#### how to solve
Avoid adding double entries in the list.

### Bug #02 Adding empty ToDos possible
If there is nothing entered in the input field, a ToDo is generated when pressing enter. 
#### how to reproduce
Select the input field below "Enter a new ToDo:", do not write anything and press enter or press the "Add" button.
#### how to solve
Avoid adding empty entries in the list.

## Tasks
1. Fix the bugs mentioned above. 
2. Make the whole page in one column, but keep the entry form centered and the list aligned to the left.
3. Replace the "Delete" in the delete button with a trash can icon.
4. Add a checkbox for each ToDo entry so that it can be marked as "Done".
5. Add a button to remove all selected ("Done") ToDos from the list.
6. Fetch a motivating quote from [this public API](https://api.goprogram.ai/inspiration/docs/) each time a ToDo is created or marked as done.
7. Display the quote in some nice but not disturbing way to the user.