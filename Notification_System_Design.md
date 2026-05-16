# Stage 1: Priority Inbox System Design

## Priority Approach
Notifications receive weights to ensure critical updates surface first:
- Placement: Weight 3
- Result: Weight 2
- Event: Weight 1
- Others: Weight 0

## Sorting Logic
Stable multi-pass sort:
1. Primary: Descending order of priority weight.
2. Secondary: Descending order of timestamp (recency).

## Top 10 Maintenance Strategy
We fetch the complete dataset, sort it efficiently, and apply a slice truncation `slice(0, 10)` to keep the logic lightweight for the frontend state.

## Time Complexity
- Time Complexity: O(N log N) dominated by the sorting operation.
- Space Complexity: O(N) to store the retrieved list before truncating.
