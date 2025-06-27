import React, { useEffect, useState } from 'react';
import { Calendar, Award, BookOpen, Target, GraduationCap, FileText, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  grade?: string;
  type: 'education' | 'certification';
}

const Education: React.FC = () => {
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const educationItems: EducationItem[] = [
    {
      id: 1,
      title: "Grado en Ingeniería Informática",
      institution: "Universidad Politécnica de Madrid",
      date: "2016 - 2020",
      description: "Especialización en Ingeniería del Software con enfoque en desarrollo web y arquitectura de sistemas distribuidos.",
      grade: "Sobresaliente",
      type: "education"
    },
    {
      id: 2,
      title: "Máster en Desarrollo Full Stack",
      institution: "Keepcoding Academy",
      date: "2020 - 2021",
      description: "Programa intensivo de 12 meses enfocado en tecnologías modernas de desarrollo web, metodologías ágiles y DevOps.",
      grade: "Excelente",
      type: "education"
    },
    {
      id: 3,
      title: "Bachillerato Científico-Tecnológico",
      institution: "IES San Patricio",
      date: "2014 - 2016",
      description: "Especialización en Matemáticas, Física y Tecnología Industrial con mención honorífica.",
      grade: "Sobresaliente",
      type: "education"
    }
  ];

  const certificationItems: EducationItem[] = [
    {
      id: 4,
      title: "Certificación React Advanced",
      institution: "Meta (Facebook)",
      date: "2022",
      description: "Certificación oficial en desarrollo avanzado con React, incluyendo hooks avanzados, performance optimization y testing.",
      grade: "Certificado",
      type: "certification"
    },
    {
      id: 5,
      title: "AWS Cloud Practitioner",
      institution: "Amazon Web Services",
      date: "2023",
      description: "Certificación fundamental de AWS que valida el conocimiento general de la nube de AWS.",
      grade: "Certificado",
      type: "certification"
    },
    {
      id: 6,
      title: "Google Analytics Certified",
      institution: "Google",
      date: "2021",
      description: "Certificación en Google Analytics para análisis web y medición de rendimiento digital.",
      grade: "Certificado",
      type: "certification"
    }
  ];

  const skills = [
    "Arquitectura de Software",
    "Metodologías Ágiles",
    "Testing & QA",
    "Performance Optimization",
    "Diseño Responsive",
    "Accesibilidad Web",
    "SEO Técnico",
    "DevOps Básico"
  ];

  const latestEducation = educationItems[1]; // Máster más reciente
  const latestCertification = certificationItems[0]; // Certificación más reciente

  useEffect(() => {
    gsap.fromTo('.education-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.education-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.sidebar-content',
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.education-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const EducationCard = ({ item, isPreview = false }: { item: EducationItem; isPreview?: boolean }) => (
    <div className={`education-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isPreview ? 'border-accent/20' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
        <div className="flex-1">
          <h4 className={`${isPreview ? 'text-lg' : 'text-xl'} font-bold text-foreground mb-2`}>{item.title}</h4>
          <p className="text-accent font-semibold mb-2">{item.institution}</p>
          <div className="flex items-center text-muted-foreground mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            {item.date}
          </div>
        </div>
        {item.grade && (
          <div className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 w-fit">
            <Award className="w-4 h-4 mr-1" />
            {item.grade}
          </div>
        )}
      </div>
      <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
    </div>
  );

  return (
    <section id="estudios" className="education-section py-12 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Formación Académica</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">Mi trayectoria educativa y crecimiento profesional</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Education and Certifications */}
          <div className="lg:col-span-2">
            <div className="education-grid space-y-6 sm:space-y-8">
              {/* Education Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <GraduationCap className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2" />
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Estudios</h3>
                  </div>
                </div>
                
                {/* Latest Education Preview */}
                <div className="mb-4">
                  <EducationCard item={latestEducation} isPreview={true} />
                </div>

                {/* Show All Education */}
                {showAllEducation && (
                  <div className="space-y-4 mb-4">
                    {educationItems.filter(item => item.id !== latestEducation.id).map((item) => (
                      <EducationCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowAllEducation(!showAllEducation)}
                  className="flex items-center text-accent hover:text-accent/80 font-medium transition-colors duration-300 text-sm sm:text-base"
                >
                  {showAllEducation ? 'Ver menos' : `Ver todos los estudios (${educationItems.length})`}
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${showAllEducation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Certifications Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2" />
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Certificaciones</h3>
                  </div>
                </div>
                
                {/* Latest Certification Preview */}
                <div className="mb-4">
                  <EducationCard item={latestCertification} isPreview={true} />
                </div>

                {/* Show All Certifications */}
                {showAllCertifications && (
                  <div className="space-y-4 mb-4">
                    {certificationItems.filter(item => item.id !== latestCertification.id).map((item) => (
                      <EducationCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowAllCertifications(!showAllCertifications)}
                  className="flex items-center text-accent hover:text-accent/80 font-medium transition-colors duration-300 text-sm sm:text-base"
                >
                  {showAllCertifications ? 'Ver menos' : `Ver todas las certificaciones (${certificationItems.length})`}
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${showAllCertifications ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sidebar-content sticky top-24 space-y-6">
              {/* Key Competencies */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Target className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2" />
                  <h3 className="text-base sm:text-lg font-bold text-foreground">Competencias Clave</h3>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continuous Learning */}
              <div className="bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2" />
                  <h3 className="text-base sm:text-lg font-bold text-foreground">Aprendizaje Continuo</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Me mantengo actualizado con las últimas tendencias y tecnologías del desarrollo web. 
                  Actualmente estudiando Web3 y arquitecturas de microservicios.
                </p>
                <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                  <p className="text-accent text-sm font-medium">
                    🎯 Próximo objetivo: Certificación AWS Solutions Architect
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;