# Verify Tests To Write

## Code-Breaking Bugs
- Users cannot click "Validate & Load Next" if they are at the end of the loaded array and an Awaiting Batch is still loading.

- Loading signal warns users when the Awaiting Batch is loading.

- queuedMetadata.length = 0
    - correct cleaning. "CONGRATULATIONS YOU'VE REACHED THE END" screen should show.