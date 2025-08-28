import PyPDF2
import sys

# PDF文件路径
pdf_file_path = 'c:/Users/29768/Desktop/小红书-Key-工作简历网站/Key_WebDesign/portfolio_template/asset/doc/Zhijian_Ke_Resume_2.pdf'

# 打开PDF文件
try:
    with open(pdf_file_path, 'rb') as pdf_file:
        # 创建PDF阅读器
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # 获取PDF的页数
        num_pages = len(pdf_reader.pages)
        print(f'PDF文件共有{num_pages}页')
        
        # 提取每一页的文本
        all_text = ''
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            all_text += f'\n\n===== 第{page_num+1}页 =====\n\n'
            all_text += text
            
        # 打印提取的文本
        print(all_text)
        
        # 也可以将文本保存到文件
        with open('extracted_resume_text.txt', 'w', encoding='utf-8') as output_file:
            output_file.write(all_text)
        print('\n文本内容已保存到 extracted_resume_text.txt 文件')
        
except Exception as e:
    print(f'处理PDF文件时出错: {str(e)}')
    sys.exit(1)