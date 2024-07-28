import {motion} from 'framer-motion';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';

import Image from 'next/image';
const ArchCard = ({title, content, imgUrl, index}: {title: string, content: string, imgUrl: string, index: number}) => {
  return (
    <motion.div 
    initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left 
        x: index % 2 === 0 ? 50 : -50
      }}
      whileInView={{
        opacity: 1,
        x: 0, // Slide in to its original position
        transition: {
          duration: 1 
        }
      }}
      viewport={{ once: true }}
      className='bg-gray-50/10 backdrop-blur-sm mt-4 w-3/4 max-md:w-full odd:self-end'>
      <Card className='bg-transparent'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 md:gap-6">
                    <div className="block object-contain h-[300px] md:h-full w-full max-md:mx-auto">
                      <Image src={imgUrl} alt={title} width={1000} height={1000} className='h-full w-full rounded-md'/>
                    </div>
                    <p className='text-pretty'>
                        {content}
                    </p>
                    
                </div>
            </CardContent>
      </Card>
    </motion.div>
  )
}

export default ArchCard
