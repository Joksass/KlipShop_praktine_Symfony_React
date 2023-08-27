<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Test;
use Doctrine\ORM\EntityManagerInterface;

class LuckyController extends AbstractController
{
    #[Route('/lucky', name: 'app_lucky')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $testRepository = $entityManager->getRepository(Test::Class);
        $test = $testRepository->findAll();
        $myname = $test[0]->getName(); //VIENA REIKIAMA PASIEMAM
        
        $number = random_int(0, 100);
        return $this->render('lucky/index.html.twig', [
            'controller_name' => 'LuckyController',
            'lucky' => $number,
            'test' =>$test,
            'myname' => $myname,
        ]);
    }
}
