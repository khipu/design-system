import re

with open('/src/app/components/stages/StageContract.tsx', 'r') as f:
    content = f.read()

old = '                      <p className="mt-2">___________________</p>'
new = '                      <p className="mt-2">{personType === \'natural\' && (formData?.firstName || formData?.lastName) ? `${formData?.firstName || \'\'} ${formData?.lastName || \'\'}`.trim() : \'___________________\'}</p>'

content = content.replace(old, new, 1)

with open('/src/app/components/stages/StageContract.tsx', 'w') as f:
    f.write(content)

print("Done")
