import { Button, Center, createStyles, Group, Text } from '@mantine/core'
import { Dropzone as MantineDropzone } from '@mantine/dropzone'
import { Dispatch, ForwardedRef, SetStateAction, useRef } from 'react'
import { TbCloudUpload, TbUpload } from 'react-icons/tb'
import useSetting from '../../hooks/setting.hook'
import { FileUpload } from '../../types/file.type'
import { byteToHumanSizeString } from '../../utils/fileSize.util'
import toast from '../../utils/toast.util'
import { t, Trans } from '@lingui/macro'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    bottom: -20,
  },
}))

const Dropzone = ({
  isUploading,
  maxShareSize,
  files,
  setFiles,
}: {
  isUploading: boolean
  maxShareSize: number
  files: FileUpload[]
  setFiles: Dispatch<SetStateAction<FileUpload[]>>
}) => {
  const { classes } = useStyles()
  const openRef = useRef<() => void>()

  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        onReject={(e) => {
          toast.error(e[0].errors[0].message)
        }}
        disabled={isUploading}
        openRef={openRef as ForwardedRef<() => void>}
        onDrop={(newFiles: FileUpload[]) => {
          const fileSizeSum = [...newFiles, ...files].reduce((n, { size }) => n + size, 0)

          if (fileSizeSum > maxShareSize) {
            toast.error(
              t`Your files exceed the maximum share size of ${byteToHumanSizeString(maxShareSize)}.`
            )
          } else {
            newFiles = newFiles.map((newFile) => {
              newFile.uploadingProgress = 0
              return newFile
            })
            setFiles([...newFiles, ...files])
          }
        }}
        className={classes.dropzone}
        radius="md"
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <TbCloudUpload size={50} />
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Trans>Upload files</Trans>
          </Text>

          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop files here to start your share. We can accept only files that are
            less than {byteToHumanSizeString(maxShareSize)} in total.
          </Text>
        </div>
      </MantineDropzone>

      <Center>
        <Button
          className={classes.control}
          variant="light"
          size="sm"
          radius="xl"
          disabled={isUploading}
          onClick={() => openRef.current && openRef.current()}
        >
          {<TbUpload />}
        </Button>
      </Center>
    </div>
  )
}
export default Dropzone
