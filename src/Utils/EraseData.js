import { API, graphqlOperation } from 'aws-amplify';
import { listEfforts, listPosts, listTrophys, listUserRecords } from '../../graphql/queries';
import { deleteEffort, deletePost, deleteTrophy, deleteUserRecord } from '../../graphql/mutations';

//kinda lazy way of clearing entire tables
//just throw it into a useeffect whenever you need to
//erases trophies, efforts, posts, and userrecords
export const EraseData = async () => {

    const trophyOps = [listTrophys, 'listTrophys', deleteTrophy];
    const effortOps = [listEfforts, 'listEfforts', deleteEffort];
    const postOps = [listPosts, 'listPosts', deletePost];

    const deleteTrios = [
        trophyOps,
        effortOps,
        postOps
    ];

    deleteTrios.forEach(trio => {
        //erase trophies
        API.graphql(graphqlOperation(trio[0]))
            .then(result => {
                result.data[trio[1]].items.forEach(item => {
                    API.graphql(graphqlOperation(trio[2], {
                        input: {
                            id: item.id
                        }
                    }))

                })
            });
    })

    API.graphql(graphqlOperation(listUserRecords))
        .then(result => {
            result.data.listUserRecords.items.forEach(item => {
                API.graphql(graphqlOperation(deleteUserRecord, {
                    input: {
                        userID: item.userID,
                        exercise: item.exercise
                    }
                }));
            });
        });

};
