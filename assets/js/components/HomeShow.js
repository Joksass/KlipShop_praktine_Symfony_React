// assets/js/components/LoginForm.js
import React, { useEffect, useState  } from 'react';
import axios from 'axios';

const HomeShow = () => {
    const [users, setUsers] = useState([]);
    const [description, setDescription] = useState('');

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    //GET ALL USERS DATA
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('/api/users/show');
            const fetchedUsers = response.data['users'];
            setUsers(fetchedUsers);
          } catch (error) {
            console.error('An error occurred', error);
          }
        };
    
        fetchData(); // Call the fetchData function immediately when the component mounts
    }, []);
    //END USERS DATA

    //APPROVE USER
    const handleApproveSubmit = async ( userId) => {
        const data = new FormData();
        data.append('id', userId);

        try {
            const response = await axios.post('/api/user/approve', data, config);
      
            if (response.status === 200) {
                // Successful login, you can redirect or perform other actions
                console.log('Approved user ', userId);
            }else if(response.status === 404){
                console.log('User not found with the given ID')
            }else if(response.status === 409){
                console.log('User already has this role')
            }

        } catch (error) {
        console.error('An error occurred', error);
        }
    };
    //END APPROVE USER

    //UNAPPROVE USER
    const handleUnapproveSubmit = async (userId) => {
        const data = new FormData();
        data.append('id', userId);

        try {
            const response = await axios.post('/api/user/unapprove', data, config);
      
            if (response.status === 200) {
                // Successful login, you can redirect or perform other actions
                console.log('Unapproved user ', userId);
            }else if(response.status === 404){
                console.log('User not found with the given ID')
            }else if(response.status === 409){
                console.log("User doesn't have the approved role")
            }

        } catch (error) {
        console.error('An error occurred', error);
        }
    };
    //END UNAPPROVE USER

    //EDIT USER
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleEditSubmit = async (userId) => {
        const data = new FormData();
        data.append('id', userId);
        data.append('description', description);

        try {
            const response = await axios.post('/api/user/edit', data, config);
      
            if (response.status === 200) {
                // Successful login, you can redirect or perform other actions
                console.log('Edited description of user ', userId);
            }else if(response.status === 404){
                console.log('User not found with the given ID')
            }

        } catch (error) {
        console.error('An error occurred', error);
        }

    }
    //END EDIT USER

    //DELETE USER
    const handleDeleteSubmit = async (userId) => {
        const data = new FormData();
        data.append('id', userId);

        try {
            const response = await axios.post('/api/user/delete', data, config);
      
            if (response.status === 200) {
                // Successful login, you can redirect or perform other actions
                console.log('Soft delete user', userId);
            }else if(response.status === 404){
                console.log('User not found with the given ID')
            }

        } catch (error) {
        console.error('An error occurred', error);
        }
    }
    //END DELETE USER

  return (

    <div class="">
        <table class="table table-hover">
            <thead class="">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, userIndex) => (
                <tr key={userIndex}>
                    <th scope="row">{userIndex + 1}</th>
                    <td>{user.email}</td>
                    <td>
                        <ul class="list-group list-group-flush">
                            {user.roles.map((role,roleIndex) =>(
                                <li class="list-group-item" key={roleIndex}>{role}</li>
                            ))}
                        </ul>
                        
                    </td>
                    <td>{user.description}</td>
                    <td>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                        {!user.roles.includes('ROLE_APPROVED') && (
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#apprModal${user.id}`}>Approve</button>
                        )}

                        {user.roles.includes('ROLE_APPROVED') && (
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#unappModal${user.id}`}>Unapprove</button>
                        )}
                        
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#editModal${user.id}`}>Edit</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#delModal${user.id}`}>Delete</button>
                    </div>
                    {/* <!-- APPROVE --> */}
                    {/* <!-- Approve Modal --> */}
                        <div class="modal fade" id={`apprModal${user.id}`} tabindex="-1" role="dialog" aria-labelledby="apprModalTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form onSubmit={() => handleApproveSubmit(user.id)}>
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="apprModalTitle"><b>{userIndex + 1}</b> {user.email}</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="text-center h5">Approve user?</div>                
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Approve</button>
                                    </div>
                                </form >
                            </div>
                            </div>
                        </div>
                    {/* <!-- Approve Modal End --> */}
                    {/* <!-- APPROVE END --> */}

                    {/* <!-- UNAPPROVE --> */}
                    {/* <!-- Unapprove Modal --> */}
                        <div class="modal fade" id={`unappModal${user.id}`} tabindex="-1" role="dialog" aria-labelledby="unappModalTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form onSubmit={() => handleUnapproveSubmit(user.id)}>
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="unappModalTitle"><b>{userIndex + 1}</b> {user.email}</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="text-center h5">Unapprove user?</div>                     
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Unapprove</button>
                                    </div>
                                </form >
                            </div>
                            </div>
                        </div>
                    {/* <!-- Unapprove Modal End --> */}
                    {/* <!-- UNAPPROVE END --> */}

                    {/* <!-- EDIT --> */}
                    {/* <!-- Edit Modal --> */}
                        <div class="modal fade" id={`editModal${user.id}`} tabindex="-1" role="dialog" aria-labelledby="editModalTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form onSubmit={() => handleEditSubmit(user.id)}>
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editModalTitle"><b>{userIndex + 1}</b> {user.email}</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <ul class="list-unstyled">
                                            <li>Roles:</li>
                                                <ul>
                                                    {user.roles.map((role,roleIndex) =>(
                                                        <li key={roleIndex}>{role}</li>
                                                    ))}
                                                </ul>
                                        </ul>
                                        
                                        <div class="form-group">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="description" rows="3" name="description" type="text" onChange={handleDescriptionChange}>{user.description}</textarea>
                                        </div>                      
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Edit</button>
                                    </div>
                                </form >
                            </div>
                            </div>
                        </div>
                    {/* <!-- Edit Modal End --> */}
                    {/* <!-- EDIT END --> */}

                    {/* <!-- DELETE --> */}
                    {/* <!-- Delete Modal --> */}
                        <div class="modal fade" id={`delModal${user.id}`} tabindex="-1" role="dialog" aria-labelledby="delModalTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form onSubmit={() => handleDeleteSubmit(user.id)}>
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="delModalTitle"><b>{userIndex + 1}</b> {user.email}</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="text-center h5">Delete user?</div>                     
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Delete</button>
                                    </div>
                                </form >
                            </div>
                            </div>
                        </div>
                    {/* <!-- Delete Modal End --> */}
                    {/* <!-- DELETE END --> */}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};


export default HomeShow;


