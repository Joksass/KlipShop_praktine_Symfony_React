<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class ApiUsersController extends AbstractController
{
    //#[Route('/api/users/show', name: 'api_users_show')]
    public function show(EntityManagerInterface $entityManager): Response
    {
        $userRepository = $entityManager->getRepository(User::Class);
        $userTable = $userRepository->findBy(
            ['softDelete' => null ],
        );
        
        return $this->json([
            "users" => $userTable,
        ]);
    }

    public function approve(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $id = $data['id'];
        $user = $entityManager->getRepository(User::class)->find($id);
        
        if (!$user) {
            return $this->json([
                "message" => "User not found with the given ID",
            ], Response::HTTP_NOT_FOUND);
        }

        $currentRoles = $user->getRoles();
        $newRole = 'ROLE_APPROVED';

        if (!in_array($newRole, $currentRoles)){
            $currentRoles[] = $newRole;
            $user->setRoles($currentRoles);

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json([
                "message" => "User $id Approved",
            ]);

        }else {
            return $this->json([
                "message" => "User already has this role",
            ], Response::HTTP_CONFLICT);
        }    
    }

    public function unapprove(Request $request, EntityManagerInterface $entityManager):Response
    {
        $data = json_decode($request->getContent(), true);
        
        $id = $data['id'];
        $user = $entityManager->getRepository(User::class)->find($id);
        
        if (!$user) {
            return $this->json([
                "message" => "User not found with the given ID",
            ], Response::HTTP_NOT_FOUND);
        }

        $currentRoles = $user->getRoles();
        $roleToDelete = 'ROLE_APPROVED';

        if (in_array($roleToDelete, $currentRoles)) {
            $newRoles = array_diff($currentRoles, [$roleToDelete]);
            $user->setRoles($newRoles);
    
            $entityManager->persist($user);
            $entityManager->flush();
    
            return $this->json([
                "message" => "User $id Unapproved",
            ]);
    
        } else {
            return $this->json([
                "message" => "User doesn't have the approved role",
            ], Response::HTTP_CONFLICT);
        }

    }

    public function edit(Request $request, EntityManagerInterface $entityManager):Response
    {
        $data = json_decode($request->getContent(), true);
        
        $id = $data['id'];
        $desc = $data['description'];

        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json([
                "message" => "User not found with the given ID",
            ], Response::HTTP_NOT_FOUND);
        }

        $user->setDescription($desc);
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            "message" => "User $id description updated",
        ]);
    }

    public function delete(Request $request, EntityManagerInterface $entityManager):Response
    {
        $data = json_decode($request->getContent(), true);
        
        $id = $data['id'];
        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json([
                "message" => "User not found with the given ID",
            ], Response::HTTP_NOT_FOUND);
        }

        $user->setSoftDelete(1);
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            "message" => "User $id soft deleted",
        ]);

    }
}
