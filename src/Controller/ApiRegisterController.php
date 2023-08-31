<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use App\Form\RegistrationFormType;


class ApiRegisterController extends AbstractController
{
    //#[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        // Parse JSON data from the request
        $data = json_decode($request->getContent(), true);

        $user = new User();

        // Use the provided email and plainPassword data
        $user->setEmail($data['email']);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $data['plainPassword']
            )
        );

        // Other user data can be set if needed

        $entityManager->persist($user);
        $entityManager->flush();

        // Return a JSON response
        return $this->json([
            'message' => 'User registered successfully'
        ]);
    }
}
