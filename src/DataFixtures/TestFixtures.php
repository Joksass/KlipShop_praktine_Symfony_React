<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Test;


class TestFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $test = new Test();
        $test->setName('Arnas');
        $test->setSurname('Joksas');
        $manager->persist($test);


        $manager->flush();
    }
}
