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

